"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [matches, setMatches] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [admin, setAdmin] = useState(false);

  useEffect(() => {
    verificarAdmin();
  }, []);

  async function verificarAdmin() {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    window.location.href = "/cadastro";
    return;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("admin")
    .eq("id", userData.user.id)
    .single();

  if (!profile?.admin) {
    setAdmin(false);
    setLoading(false);
    return;
  }

  setAdmin(true);
  await carregar();
  setLoading(false);
}
  async function carregar() {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .order("match_date");

    setMatches(data || []);
  }

  async function salvarResultado(
    matchId: string,
    home: number,
    away: number
  ) {
    await supabase
      .from("matches")
      .update({
        home_score: home,
        away_score: away,
        status: "finished",
      })
      .eq("id", matchId);

    alert("Resultado salvo!");
  }

  async function processarPontuacao() {
  const { data: jogos } = await supabase
    .from("matches")
    .select("*")
    .eq("status", "finished");

  for (const jogo of jogos || []) {
    const { data: palpites } = await supabase
      .from("predictions")
      .select("*")
      .eq("match_id", jogo.id);

    for (const palpite of palpites || []) {
      let pontos = 0;

      const placarExato =
        palpite.home_score === jogo.home_score &&
        palpite.away_score === jogo.away_score;

      if (placarExato) {
        pontos = 10;
      } else {
        const vencedorPalpite =
          palpite.home_score > palpite.away_score
            ? "home"
            : palpite.home_score < palpite.away_score
            ? "away"
            : "draw";

        const vencedorReal =
          jogo.home_score > jogo.away_score
            ? "home"
            : jogo.home_score < jogo.away_score
            ? "away"
            : "draw";

        if (vencedorPalpite === vencedorReal) {
          pontos = 5;
        }
      }

      await supabase
        .from("predictions")
        .update({ points: pontos })
        .eq("id", palpite.id);
    }
  }

  alert("Pontuação processada!");
}

if (loading) {
  return <div className="p-10">Carregando...</div>;
}

if (!admin) {
  return (
    <main className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6">
      <div className="bg-white border rounded-3xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-black">Acesso negado</h1>
        <p className="text-black/60 mt-3">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    </main>
  );
}

  return (
    <main className="min-h-screen p-10 bg-[#FAFAF7]">
      <div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-black">
    Admin Resultados
  </h1>

  <button
    onClick={processarPontuacao}
    className="bg-[#D4AF37] text-black px-6 py-3 rounded-2xl font-black"
  >
    Processar Pontuação
  </button>
</div>

      {matches.map((match) => (
        <ResultadoCard
          key={match.id}
          match={match}
          onSave={salvarResultado}
        />
      ))}
    </main>
  );
}

function ResultadoCard({ match, onSave }: any) {
  const [home, setHome] = useState(match.home_score ?? "");
  const [away, setAway] = useState(match.away_score ?? "");

  return (
    <div className="bg-white border rounded-3xl p-6 mb-4">
      <div className="flex justify-between items-center">
        <span>{match.home_team}</span>

        <div className="flex gap-2">
          <input
            value={home}
            onChange={(e) => setHome(e.target.value)}
            className="w-16 border rounded-xl p-2 text-center"
          />

          <span>x</span>

          <input
            value={away}
            onChange={(e) => setAway(e.target.value)}
            className="w-16 border rounded-xl p-2 text-center"
          />
        </div>

        <span>{match.away_team}</span>
      </div>

      <button
        onClick={() =>
          onSave(match.id, Number(home), Number(away))
        }
        className="mt-4 bg-[#0B6E4F] text-white px-5 py-2 rounded-xl"
      >
        Salvar Resultado
      </button>
    </div>
  );
}