"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Pagamento() {
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<any>(null);
  const [erro, setErro] = useState("");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function carregarUsuario() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        window.location.href = "/cadastro";
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      setProfile(profileData);
    }

    carregarUsuario();
  }, []);

  async function gerarPix() {
    if (!profile) {
      setErro("Dados do usuário não encontrados.");
      return;
    }

    setLoading(true);
    setErro("");

    const response = await fetch("/api/asaas/create-pix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  userId: profile.id,
  nome: profile.nome,
  email: profile.email || "",
  cpf: profile.cpf,
}),
    });

    const data = await response.json();

    if (!response.ok) {
      setErro(data.error || "Erro ao gerar PIX.");
      setLoading(false);
      return;
    }

    setPix(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6 py-10">
      <div className="bg-white rounded-3xl border p-8 max-w-md w-full text-center">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-3xl font-black mt-3">Finalizar inscrição</h1>

        <p className="text-black/60 mt-3">
          Pague R$ 49,90 via PIX para liberar seu acesso.
        </p>

        <button
          onClick={gerarPix}
          disabled={loading || !profile}
          className="w-full bg-[#0B6E4F] text-white rounded-2xl py-4 font-black mt-8 disabled:opacity-60"
        >
          {loading ? "Gerando PIX..." : "Gerar PIX"}
        </button>

        {erro && (
          <div className="mt-5 bg-red-50 text-red-700 border border-red-200 rounded-2xl p-4 text-sm font-bold">
            {erro}
          </div>
        )}

        {pix && (
          <div className="mt-8">
            <img
              src={`data:image/png;base64,${pix.encodedImage}`}
              alt="QR Code PIX"
              className="mx-auto w-56 h-56"
            />

            <textarea
              readOnly
              value={pix.payload}
              className="w-full border rounded-2xl p-3 mt-4 text-xs"
              rows={4}
            />

            <a
              href={pix.invoiceUrl}
              target="_blank"
              className="block mt-4 text-[#0B6E4F] font-black"
            >
              Abrir cobrança
            </a>
          </div>
        )}
      </div>
    </main>
  );
}