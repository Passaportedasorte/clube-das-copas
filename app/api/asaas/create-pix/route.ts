import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ASAAS_API_KEY?.replace("\\", "");
    const baseUrl = process.env.ASAAS_BASE_URL;

    const body = await req.json();

    const nome = body.nome;
    const email = body.email;
    const cpf = body.cpf;
    const userId = body.userId;

    const valorOriginal = 49.9;

    if (!apiKey || !baseUrl) {
      return NextResponse.json(
        { error: "Asaas não configurado." },
        { status: 500 }
      );
    }

    if (!nome || !email || !cpf || !userId) {
      return NextResponse.json(
        { error: "Nome, e-mail, CPF e usuário são obrigatórios." },
        { status: 400 }
      );
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("referred_by")
      .eq("id", userId)
      .single();

    const codigoCupom = String(profile?.referred_by || "")
      .trim()
      .toUpperCase();

    let valorFinal = valorOriginal;
    let desconto = 0;
    let percentualDesconto = 0;
    let cupomValido = false;

    if (codigoCupom) {
      const { data: cupom } = await supabaseAdmin
        .from("coupons")
        .select("*")
        .eq("code", codigoCupom)
        .eq("active", true)
        .maybeSingle();

      const cupomDentroDoLimite =
        cupom && (!cupom.max_uses || cupom.uses_count < cupom.max_uses);

      if (cupomDentroDoLimite) {
        percentualDesconto = Number(cupom.discount_percent || 0);
        desconto = Number(
          ((valorOriginal * percentualDesconto) / 100).toFixed(2)
        );
        valorFinal = Number((valorOriginal - desconto).toFixed(2));
        cupomValido = true;
      }
    }

    const customerResponse = await fetch(`${baseUrl}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: apiKey,
      },
      body: JSON.stringify({
        name: nome,
        email,
        cpfCnpj: cpf.replace(/\D/g, ""),
      }),
    });

    const customer = await customerResponse.json();

    if (!customerResponse.ok) {
      console.log("ERRO CUSTOMER ASAAS:", customer);

      return NextResponse.json(
        { error: "Erro ao criar cliente", details: customer },
        { status: 400 }
      );
    }

    const paymentResponse = await fetch(`${baseUrl}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: apiKey,
      },
      body: JSON.stringify({
        customer: customer.id,
        billingType: "PIX",
        value: valorFinal,
        dueDate: new Date().toISOString().split("T")[0],
        description: cupomValido
          ? `Acesso Clube das Copas 2026 com cupom ${codigoCupom}`
          : "Acesso Clube das Copas 2026",
      }),
    });

    const payment = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.log("ERRO PAYMENT ASAAS:", payment);

      return NextResponse.json(
        { error: "Erro ao criar cobrança", details: payment },
        { status: 400 }
      );
    }

    const pixResponse = await fetch(
      `${baseUrl}/payments/${payment.id}/pixQrCode`,
      {
        method: "GET",
        headers: {
          access_token: apiKey,
        },
      }
    );

    const pix = await pixResponse.json();

    if (!pixResponse.ok) {
      return NextResponse.json(pix, { status: 400 });
    }

    const { error: subscriptionError } = await supabaseAdmin
      .from("subscriptions")
      .insert({
        user_id: userId,
        asaas_payment_id: payment.id,
        status: "pending",
        valor: valorFinal,
        original_value: valorOriginal,
        discount_value: desconto,
        referral_code: cupomValido ? codigoCupom : null,
        customer_name: nome,
        customer_email: email,
      });

    if (subscriptionError) {
      console.log("ERRO SUBSCRIPTION:", subscriptionError);

      return NextResponse.json(
        {
          error: "PIX gerado, mas erro ao salvar assinatura.",
          details: subscriptionError.message,
        },
        { status: 500 }
      );
    }

    if (cupomValido) {
  await supabaseAdmin.rpc("increment_coupon_usage", {
    coupon_code: codigoCupom,
  });
}

    return NextResponse.json({
      paymentId: payment.id,
      invoiceUrl: payment.invoiceUrl,
      encodedImage: pix.encodedImage,
      payload: pix.payload,
      valor: valorFinal,
      valorOriginal,
      desconto,
      percentualDesconto,
      cupomValido,
      referralCode: cupomValido ? codigoCupom : null,
    });
  } catch (error) {
    console.error("ERRO ASAAS:", error);

    return NextResponse.json(
      {
        error: "Erro ao gerar PIX.",
        details: String(error),
      },
      { status: 500 }
    );
  }
}