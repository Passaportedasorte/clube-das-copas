"use client";

import { useEffect } from "react";

export default function PagamentoSucesso() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Purchase", {
        value: 49.9,
        currency: "BRL",
        content_name: "Clube das Copas 2026",
      });
    }

    const timer = setTimeout(() => {
      window.location.href = "/jogos";
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#111111] flex items-center justify-center px-6">
      <div className="bg-white border rounded-3xl p-8 max-w-md w-full text-center shadow-sm">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-3xl font-black mt-3">
          Pagamento confirmado!
        </h1>

        <p className="text-black/60 mt-3">
          Sua inscrição foi liberada. Estamos te levando para a área de palpites.
        </p>

        <div className="mt-6 text-5xl">🏆</div>
      </div>
    </main>
  );
}