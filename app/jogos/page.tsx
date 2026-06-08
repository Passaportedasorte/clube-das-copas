"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Jogos() {
  const [loading, setLoading] = useState(true);
  const [liberado, setLiberado] = useState(false);
  const [userId, setUserId] = useState("");
  const [matches, setMatches] = useState<any[]>([]);
  const [palpites, setPalpites] = useState<any>({});
const [dashboard, setDashboard] = useState<any>({
  pontos: 0,
  palpitesEnviados: 0,
  posicao: "-",
});

  useEffect(() => {
    async function iniciar() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        window.location.href = "/cadastro";
        return;
      }

      setUserId(userData.user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("active")
        .eq("id", userData.user.id)
        .single();

      if (!profile?.active) {
        setLoading(false);
        return;
      }

      setLiberado(true);

      const { data: jogos } = await supabase
  .from("matches")
  .select("*")
  .order("match_date", { ascending: true });

setMatches(jogos || []);

const { data: palpitesSalvos } = await supabase
  .from("predictions")
  .select("*")
  .eq("user_id", userData.user.id);

const palpitesFormatados: any = {};

(palpitesSalvos || []).forEach((palpite) => {
  palpitesFormatados[palpite.match_id] = {
    home_score: String(palpite.home_score),
    away_score: String(palpite.away_score),
  };
});

setPalpites(palpitesFormatados);

const pontosUsuario = (palpitesSalvos || []).reduce(
  (soma, item) => soma + (item.points || 0),
  0
);

const { data: participantes } = await supabase
  .from("profiles")
  .select("id, nome, active")
  .eq("active", true);

const rankingComPontos = await Promise.all(
  (participantes || []).map(async (p) => {
    const { data: ps } = await supabase
      .from("predictions")
      .select("points")
      .eq("user_id", p.id);

    const total = (ps || []).reduce(
      (soma, item) => soma + (item.points || 0),
      0
    );

    return {
      id: p.id,
      pontos: total,
    };
  })
);

const rankingOrdenado = rankingComPontos.sort(
  (a, b) => b.pontos - a.pontos
);

const posicao = rankingOrdenado.findIndex(
  (item) => item.id === userData.user.id
);

setDashboard({
  pontos: pontosUsuario,
  palpitesEnviados: (palpitesSalvos || []).length,
  posicao: posicao >= 0 ? posicao + 1 : "-",
});

setLoading(false);
    }

    iniciar();
  }, []);

  function atualizarPalpite(matchId: string, campo: string, valor: string) {
    setPalpites((prev: any) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [campo]: valor,
      },
    }));
  }

  async function salvarPalpites() {
    const registros = Object.entries(palpites).map(([matchId, palpite]: any) => ({
      user_id: userId,
      match_id: matchId,
      home_score: Number(palpite.home_score),
      away_score: Number(palpite.away_score),
    }));

    if (registros.length === 0) {
      alert("Preencha pelo menos um palpite.");
      return;
    }

    const { error } = await supabase
      .from("predictions")
      .upsert(registros, { onConflict: "user_id,match_id" });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Palpites salvos com sucesso!");
  }

  if (loading) return <div className="p-10">Carregando...</div>;

  if (!liberado) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAFAF7]">
        <div className="bg-white border rounded-3xl p-8 text-center max-w-md">
          <h1 className="text-3xl font-black">Acesso não liberado</h1>
          <p className="mt-4 text-black/60">Seu pagamento ainda não foi confirmado.</p>
          <a href="/pagamento" className="inline-block mt-6 bg-[#0B6E4F] text-white px-6 py-3 rounded-2xl font-black">
            Finalizar pagamento
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#111111] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#0B6E4F] font-black text-sm">CLUBE DAS COPAS 2026</p>
        <h1 className="text-4xl font-black mt-3">Meus palpites</h1>
        <p className="text-black/60 mt-2">Preencha seus palpites para os jogos da Copa.</p>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
  <div className="bg-white border rounded-3xl p-6">
    <p className="text-black/50 font-bold text-sm">Minha posição</p>
    <p className="text-3xl font-black text-[#D4AF37] mt-2">
      #{dashboard.posicao}
    </p>
  </div>

  <div className="bg-white border rounded-3xl p-6">
    <p className="text-black/50 font-bold text-sm">Meus pontos</p>
    <p className="text-3xl font-black text-[#0B6E4F] mt-2">
      {dashboard.pontos} pts
    </p>
  </div>

  <div className="bg-white border rounded-3xl p-6">
    <p className="text-black/50 font-bold text-sm">Palpites enviados</p>
    <p className="text-3xl font-black mt-2">
      {dashboard.palpitesEnviados}
    </p>
  </div>
</div>

        <div className="grid gap-4 mt-10">
          {matches.map((match) => (
            <div key={match.id} className="bg-white border rounded-3xl p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="font-black text-lg">{match.home_team}</span>

                <div className="flex items-center gap-3">
                  <input
  type="number"
  min="0"
  value={palpites[match.id]?.home_score || ""}
  className="w-16 border rounded-xl p-2 text-center"
  onChange={(e) => atualizarPalpite(match.id, "home_score", e.target.value)}
/>
                  <span className="font-black">x</span>
                  <input
  type="number"
  min="0"
  value={palpites[match.id]?.away_score || ""}
  className="w-16 border rounded-xl p-2 text-center"
  onChange={(e) => atualizarPalpite(match.id, "away_score", e.target.value)}
/>
                </div>

                <span className="font-black text-lg">{match.away_team}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={salvarPalpites}
          className="w-full bg-[#0B6E4F] text-white rounded-2xl py-4 font-black mt-8"
        >
          Salvar Palpites
        </button>
      </div>
    </main>
  );
}