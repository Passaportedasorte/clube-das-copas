"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Pagamento() {
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<any>(null);
  const [erro, setErro] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [couponCode, setCouponCode] = useState("");

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

async function copiarPix() {
  if (!pix?.payload) return;

  await navigator.clipboard.writeText(pix.payload);
  alert("PIX Copia e Cola copiado!");
}

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
  couponCode,
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

const intervalo = setInterval(async () => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return;

  const { data: profileAtualizado } = await supabase
    .from("profiles")
    .select("active")
    .eq("id", userData.user.id)
    .single();

  if (profileAtualizado?.active) {
    clearInterval(intervalo);
    window.location.href = "/jogos";
  }
}, 3000);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6 py-10">
      <div className="bg-white rounded-3xl border p-8 max-w-md w-full text-center">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-3xl font-black mt-3">Finalizar inscrição</h1>

        <p className="text-black/60 mt-3">
          Gere seu PIX para liberar o acesso ao Clube das Copas.
        </p>

<div className="mt-6 text-left">
  <label className="text-sm font-black text-black">
    Cupom de desconto
  </label>

  <input
    value={couponCode}
    onChange={(e) =>
      setCouponCode(
        e.target.value
          .trim()
          .toUpperCase()
      )
    }
    placeholder="Digite seu cupom, se tiver"
    className="w-full mt-2 border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40"
  />

  <p className="text-xs text-black/50 mt-2">
    Se você recebeu um cupom, informe antes de gerar o PIX.
  </p>
</div>
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
    <div className="mb-5 bg-[#FAFAF7] border rounded-2xl p-4">
      <p className="text-sm text-black/50 font-bold">
        Valor da inscrição
      </p>

      <p className="text-3xl font-black text-[#0B6E4F] mt-1">
        R$ {Number(pix.valor || 49.9).toFixed(2).replace(".", ",")}
      </p>

      {pix.cupomValido && (
        <p className="text-sm font-bold text-[#D4AF37] mt-2">
          Cupom aplicado: {pix.referralCode} •{" "}
          {pix.percentualDesconto}% de desconto
        </p>
      )}
    </div>
            <img
              src={`data:image/png;base64,${pix.encodedImage}`}
              alt="QR Code PIX"
              className="mx-auto w-56 h-56"
            />

            <div className="mt-5 text-left">
  <p className="text-sm font-black text-black mb-2">
    PIX Copia e Cola
  </p>

  <textarea
    readOnly
    value={pix.payload}
    className="w-full border border-black/20 rounded-2xl p-3 text-xs bg-white text-black placeholder:text-black/40"
    rows={4}
  />
</div>

            <button
  type="button"
  onClick={copiarPix}
  className="w-full mt-4 bg-[#0B6E4F] text-white rounded-2xl py-4 font-black"
>
  Copiar PIX Copia e Cola
</button>
          </div>
        )}
      </div>
    </main>
  );
}