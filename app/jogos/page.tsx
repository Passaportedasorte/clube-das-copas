"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { bandeiras } from "@/lib/flags";

export default function Jogos() {
  const [loading, setLoading] = useState(true);
  const [liberado, setLiberado] = useState(false);
  const [userId, setUserId] = useState("");
  const [matches, setMatches] = useState<any[]>([]);
  const [rodadaAberta, setRodadaAberta] = useState("Rodada 1");
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
    const jogosLiberados = matches.filter(
  (match) => !palpiteBloqueado(match.match_date)
);

const idsLiberados = jogosLiberados.map((match) => match.id);

const registros = Object.entries(palpites)
  .filter(([matchId]) => idsLiberados.includes(matchId))
  .map(([matchId, palpite]: any) => ({
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

 const jogosPorRodada = matches.reduce((acc: any, match) => {
  const rodada = match.round_name || "Fase de Grupos";

  if (!acc[rodada]) acc[rodada] = [];

  acc[rodada].push(match);

  return acc;
}, {});

  if (loading) return <div className="p-10">Carregando...</div>;

  if (!liberado) {

    function palpiteBloqueado(matchDate: string) {
  const agora = new Date();
  const dataJogo = new Date(matchDate);

  const limite = new Date(dataJogo.getTime() - 30 * 60 * 1000);

  return agora >= limite;
}

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAFAF7]">
        <div className="bg-white border rounded-3xl p-8 text-center max-w-md">
          <h1 className="text-3xl font-black">Acesso não liberado</h1>

          <p className="mt-4 text-black/60">
            Seu pagamento ainda não foi confirmado.
          </p>

          <a
            href="/pagamento"
            className="inline-block mt-6 bg-[#0B6E4F] text-white px-6 py-3 rounded-2xl font-black"
          >
            Finalizar assinatura
          </a>
        </div>
      </main>
    );
  }

function palpiteBloqueado(matchDate: string) {
  const agora = new Date();
  const dataJogo = new Date(matchDate);

  const limite = new Date(dataJogo.getTime() - 30 * 60 * 1000);

  return agora >= limite;
}

function formatarDataHora(matchDate: string) {
  return new Date(matchDate).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#111111] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-[#0B6E4F] font-black text-sm">
            CLUBE DAS COPAS 2026
          </p>

          <h1 className="text-5xl font-black mt-3 text-[#063F2F]">
            Meus Palpites
          </h1>

          <p className="text-black/60 mt-2 text-lg">
            Preencha seus palpites para os jogos da Copa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          <div className="bg-white border rounded-3xl p-6 shadow-sm">
            <p className="text-black/50 font-bold text-sm">Minha posição</p>
            <p className="text-4xl font-black text-[#D4AF37] mt-2">
              #{dashboard.posicao}
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6 shadow-sm">
            <p className="text-black/50 font-bold text-sm">Meus pontos</p>
            <p className="text-4xl font-black text-[#0B6E4F] mt-2">
              {dashboard.pontos} pts
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6 shadow-sm">
            <p className="text-black/50 font-bold text-sm">Palpites enviados</p>
            <p className="text-4xl font-black mt-2">
              {dashboard.palpitesEnviados}
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          {Object.entries(jogosPorRodada).map(([rodada, jogos]: any) => {
  const aberta = rodadaAberta === rodada;

  return (
    <section key={rodada} className="bg-white border rounded-3xl overflow-hidden">
      <button
        type="button"
        onClick={() => setRodadaAberta(aberta ? "" : rodada)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div>
          <h2 className="text-2xl font-black text-[#063F2F]">
            {rodada}
          </h2>

          <p className="text-sm text-black/50 font-bold mt-1">
            {jogos.length} jogos
          </p>
        </div>

        <span className="text-3xl font-black text-[#0B6E4F]">
          {aberta ? "−" : "+"}
        </span>
      </button>

      {aberta && (
        <div className="grid gap-4 p-4 pt-0">
          {jogos.map((match: any) => (
                  <div
                    key={match.id}
                    className="bg-white border rounded-3xl p-6 shadow-sm"
                  >
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                      <div className="flex items-center gap-4">
                       <img
  src={`https://flagcdn.com/w40/${bandeiras[match.away_team]}.png`}
  alt={match.away_team}
  className="w-10 h-7 object-cover rounded"
/>

                        <span className="font-black text-xl">
                          {match.home_team}
                        </span>
                      </div>

                      <div className="flex justify-center items-center gap-4">
                        <input
                          type="number"
                          min="0"
                          disabled={palpiteBloqueado(match.match_date)}
                          value={palpites[match.id]?.home_score || ""}
                          className="w-20 h-14 border rounded-2xl text-center text-2xl font-black"
                          onChange={(e) =>
                            atualizarPalpite(
                              match.id,
                              "home_score",
                              e.target.value
                            )
                          }
                        />

                        <span className="text-2xl font-black">x</span>

                        <input
                          type="number"
                          min="0"
                          disabled={palpiteBloqueado(match.match_date)}
                          value={palpites[match.id]?.away_score || ""}
                          className="w-20 h-14 border rounded-2xl text-center text-2xl font-black"
                          onChange={(e) =>
                            atualizarPalpite(
                              match.id,
                              "away_score",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="flex justify-end items-center gap-4 text-right">
                        <img
  src={`https://flagcdn.com/w40/${bandeiras[match.away_team]}.png`}
  alt={match.away_team}
  className="w-10 h-7 object-cover rounded"
/>

                        <span className="text-4xl">
                          {bandeiras[match.away_team] || "🏳️"}
                        </span>
                      </div>
                    </div>
<div className="mt-4 text-center">
  <p className="text-sm font-bold text-black/50">
    {formatarDataHora(match.match_date)}
  </p>

  {palpiteBloqueado(match.match_date) ? (
    <p className="text-red-600 font-bold text-sm mt-2">
      🔒 Palpites encerrados para este jogo
    </p>
  ) : (
    <p className="text-[#0B6E4F] font-bold text-sm mt-2">
      Palpites liberados até 30 minutos antes do jogo
    </p>
  )}
</div>

                  </div>
                        ))}
        </div>
      )}
    </section>
  );
})}
        </div>

        <button
          onClick={salvarPalpites}
          className="w-full bg-[#0B6E4F] text-white rounded-2xl py-4 font-black mt-10"
        >
          Salvar Palpites
        </button>
      </div>
    </main>
  );
}