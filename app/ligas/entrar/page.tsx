"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EntrarLigaPage() {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function entrarNaLiga(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const codigoLimpo = codigo.trim().toUpperCase();

    const { data: liga, error: ligaError } = await supabase
      .from("leagues")
      .select("*")
      .eq("code", codigoLimpo)
      .maybeSingle();

    if (ligaError || !liga) {
      setMensagem("Liga não encontrada. Confira o código e tente novamente.");
      setLoading(false);
      return;
    }

    const status = liga.is_private ? "pending" : "approved";

    const { error } = await supabase.from("league_members").upsert(
      {
        league_id: liga.id,
        user_id: userData.user.id,
        status,
      },
      {
        onConflict: "league_id,user_id",
      }
    );

    if (error) {
      setMensagem(error.message);
      setLoading(false);
      return;
    }

    if (liga.is_private) {
      setMensagem("Solicitação enviada! Aguarde a aprovação do criador da liga.");
    } else {
      window.location.href = `/ligas/${liga.code}`;
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-6 py-10">
      <div className="max-w-xl mx-auto bg-white border rounded-3xl p-8">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-4xl font-black mt-3 text-[#063F2F]">
          Entrar em Liga
        </h1>

        <p className="text-black/60 mt-3">
          Digite o código enviado pelo criador da liga para solicitar sua entrada.
        </p>

        <form onSubmit={entrarNaLiga} className="mt-8 space-y-5">
          <div>
            <label className="block font-bold text-sm mb-2">
              Código da Liga
            </label>

            <input
              required
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              placeholder="Ex: ABC123"
              className="w-full border rounded-2xl px-4 py-4 uppercase tracking-widest font-black text-center"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B6E4F] text-white rounded-2xl py-4 font-black disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Solicitar entrada"}
          </button>
        </form>

        {mensagem && (
          <div className="mt-6 bg-[#FAFAF7] border rounded-2xl p-4 text-center font-bold text-black/70">
            {mensagem}
          </div>
        )}

        <a
          href="/ligas"
          className="block text-center mt-6 text-[#0B6E4F] font-black"
        >
          Voltar para ligas
        </a>
      </div>
    </main>
  );
}