import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = body.event;
    const payment = body.payment;

    if (
      event !== "PAYMENT_RECEIVED" &&
      event !== "PAYMENT_CONFIRMED"
    ) {
      return NextResponse.json({ received: true });
    }

    const paymentId = payment?.id;

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID não encontrado." },
        { status: 400 }
      );
    }

    const { data: subscription, error: subError } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("asaas_payment_id", paymentId)
      .single();

    if (subError || !subscription) {
      console.log("Assinatura não encontrada:", paymentId);

      return NextResponse.json(
        { error: "Assinatura não encontrada." },
        { status: 404 }
      );
    }

    await supabaseAdmin
      .from("subscriptions")
      .update({
        status: "active",
        paid_at: new Date().toISOString(),
      })
      .eq("id", subscription.id);

    await supabaseAdmin
      .from("profiles")
      .update({
        active: true,
      })
      .eq("id", subscription.user_id);

    return NextResponse.json({
      received: true,
      activated: true,
    });
  } catch (error) {
    console.error("ERRO WEBHOOK ASAAS:", error);

    return NextResponse.json(
      { error: "Erro no webhook." },
      { status: 500 }
    );
  }
}