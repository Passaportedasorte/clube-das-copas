import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Webhook Asaas ativo",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = body.event;
    const payment = body.payment;

    const eventosAceitos = [
  "PAYMENT_RECEIVED",
  "PAYMENT_CONFIRMED",
  "PAYMENT_APPROVED",
];

const statusAceitos = [
  "RECEIVED",
  "CONFIRMED",
  "RECEIVED_IN_CASH",
];

if (
  !eventosAceitos.includes(event) &&
  !statusAceitos.includes(payment?.status)
) {
  return NextResponse.json({ received: true });
}

    const paymentId = payment?.id;

    if (!paymentId) {
      console.log("Payment ID não encontrado no webhook.");

      return NextResponse.json({ received: true });
    }

    const { data: subscription, error: subError } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("asaas_payment_id", paymentId)
      .maybeSingle();

    if (subError) {
      console.log("Erro ao buscar assinatura:", subError);

      return NextResponse.json({ received: true });
    }

    if (!subscription) {
      console.log("Assinatura não encontrada:", paymentId);

      return NextResponse.json({ received: true });
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

    return NextResponse.json({ received: true });
  }
}