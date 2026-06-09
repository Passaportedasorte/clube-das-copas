"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Jogos() {
  const [loading, setLoading] = useState(true);
  const [assinante, setAssinante] = useState(false);
  const [userId, setUserId] = useState("");
  const [matches, setMatches] = useState<any[]>([]);
  const [palpites, setPalpites] = useState<any>({});
  const [rodadaAberta, setRodadaAberta] = useState("Rodada 1");
  const [dashboard, setDashboard] = useState<any>({
    pontos: 0,
    palpitesEnviados: 0,
    posicao: "-",
  });

  useEffect(() => {
    async function iniciar() {
      const { data: userData } = await supabase.auth.getUser();

      const { data: jogos } = await supabase
        .from("matches")
        .select("*")
        .order("match_date", { ascending: true });

      setMatches(jogos || []);

      if (!userData.user) {
        setLoading(false);
        return;
      }

      setUserId(userData.user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("active")
        .eq("id", userData.user.id)
        .single();

      setAssinante(!!profile?.active);

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
        .select("id, active")
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
        (item) => item.id === userData.user?.id
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

  function codigoBandeira(time: string) {
    const mapa: Record<string, string> = {
      "África do Sul": "za",
      Alemanha: "de",
      "Arábia Saudita": "sa",
      Argélia: "dz",
      Argentina: "ar",
      Austrália: "au",
      Áustria: "at",
      Bélgica: "be",
      "Bósnia e Herzegovina": "ba",
      Brasil: "br",
      "Cabo Verde": "cv",
      Canadá: "ca",
      Catar: "qa",
      Colômbia: "co",
      "Coreia do Sul": "kr",
      "Costa do Marfim": "ci",
      Croácia: "hr",
      Curaçao: "cw",
      Egito: "eg",
      Equador: "ec",
      Escócia: "gb-sct",
      Espanha: "es",
      "Estados Unidos": "us",
      França: "fr",
      Gana: "gh",
      Haiti: "ht",
      Holanda: "nl",
      Inglaterra: "gb-eng",
      Irã: "ir",
      Iraque: "iq",
      Japão: "jp",
      Jordânia: "jo",
      Marrocos: "ma",
      México: "mx",
      Noruega: "no",
      "Nova Zelândia": "nz",
      Panamá: "pa",
      Paraguai: "py",
      Portugal: "pt",
      Suécia: "se",
      Suíça: "ch",
      Tunísia: "tn",
      Turquia: "tr",
      Uruguai: "uy",
      Uzbequistão: "uz",
      "República Tcheca": "cz",
      Senegal: "sn",
      "República Democrática do Congo": "cd",
    };

    return mapa[time?.trim()] || "";
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

  function palpiteBloqueado(matchDate: string) {
    const agora = new Date();
    const dataJogo = new Date(matchDate);
    const limite = new Date(dataJogo.getTime() - 30 * 60 * 1000);

    return agora >= limite;
  }

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
    if (!userId) {
      window.location.href = "/cadastro";
      return;
    }

    if (!assinante) {
      window.location.href = "/pagamento";
      return;
    }

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
      }))
      .filter(
        (item) =>
          !Number.isNaN(item.home_score) && !Number.isNaN(item.away_score)
      );

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

    if (!acc[rodada]) {
      acc[rodada] = [];
    }

    acc[rodada].push(match);

    return acc;
  }, {});

  function agruparPorGrupo(jogos: any[]) {
    return jogos.reduce((acc: any, match) => {
      const grupo = match.group_name || "Grupo";

      if (!acc[grupo]) {
        acc[grupo] = [];
      }

      acc[grupo].push(match);

      return acc;
    }, {});
  }

  if (loading) {
    return <div className="p-10">Carregando...</div>;
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#111111] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-[#0B6E4F] font-black text-sm">
            CLUBE DAS COPAS 2026
          </p>

          <h1 className="text-5xl font-black mt-3 text-[#063F2F]">
            Palpites
          </h1>

          <p className="text-black/60 mt-2 text-lg">
            Veja os jogos da Copa e faça seus palpites para disputar o ranking.
          </p>
        </div>

        {!assinante && (
          <div className="mt-8 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-3xl p-6 text-center">
            <h2 className="text-2xl font-black text-[#063F2F]">
              Libere seus palpites
            </h2>

            <p className="text-black/70 mt-2 max-w-2xl mx-auto">
              Você pode visualizar todos os jogos. Para preencher, salvar seus
              palpites e participar do ranking valendo R$ 10.000 em premiação,
              ative sua assinatura.
            </p>

            <a
              href={userId ? "/pagamento" : "/cadastro"}
              className="inline-block mt-5 bg-[#0B6E4F] text-white px-8 py-4 rounded-2xl font-black"
            >
              {userId ? "Liberar meus palpites" : "Criar conta e participar"}
            </a>
          </div>
        )}

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
            <p className="text-black/50 font-bold text-sm">
              Palpites enviados
            </p>

            <p className="text-4xl font-black mt-2">
              {dashboard.palpitesEnviados}
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          {Object.entries(jogosPorRodada).map(([rodada, jogos]: any) => {
            const aberta = rodadaAberta === rodada;

            return (
              <section
                key={rodada}
                className="bg-white border rounded-3xl overflow-hidden"
              >
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
                  <div className="grid gap-6 p-4 pt-0">
                    {Object.entries(agruparPorGrupo(jogos)).map(
                      ([grupo, jogosDoGrupo]: any) => (
                        <div key={grupo}>
                          <h3 className="text-xl font-black text-[#0B6E4F] mb-4">
                            {grupo}
                          </h3>

                          <div className="grid gap-4">
                            {jogosDoGrupo.map((match: any) => (
                              <div
                                key={match.id}
                                className="bg-[#FAFAF7] border rounded-3xl p-6 shadow-sm"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                                  <div className="flex items-center justify-center md:justify-start gap-3">
                                    {codigoBandeira(match.home_team) ? (
                                      <img
                                        src={`https://flagcdn.com/w80/${codigoBandeira(
                                          match.home_team
                                        )}.png`}
                                        alt={match.home_team}
                                        className="w-10 md:w-12 h-7 md:h-8 object-cover rounded shadow-sm"
                                      />
                                    ) : (
                                      <span className="text-2xl">🏳️</span>
                                    )}

                                    <span className="font-black text-xl">
                                      {match.home_team}
                                    </span>
                                  </div>

                                  <div className="flex justify-center items-center gap-4">
                                    <input
                                      type="number"
                                      min="0"
                                      disabled={
                                        !assinante ||
                                        palpiteBloqueado(match.match_date)
                                      }
                                      value={
                                        palpites[match.id]?.home_score || ""
                                      }
                                      className="w-16 md:w-20 h-12 md:h-14 border rounded-2xl text-center text-xl md:text-2xl font-black disabled:bg-gray-100 disabled:text-black/40"
                                      onChange={(e) =>
                                        atualizarPalpite(
                                          match.id,
                                          "home_score",
                                          e.target.value
                                        )
                                      }
                                    />

                                    <span className="text-2xl font-black">
                                      x
                                    </span>

                                    <input
                                      type="number"
                                      min="0"
                                      disabled={
                                        !assinante ||
                                        palpiteBloqueado(match.match_date)
                                      }
                                      value={
                                        palpites[match.id]?.away_score || ""
                                      }
                                      className="w-16 md:w-20 h-12 md:h-14 border rounded-2xl text-center text-xl md:text-2xl font-black disabled:bg-gray-100 disabled:text-black/40"
                                      onChange={(e) =>
                                        atualizarPalpite(
                                          match.id,
                                          "away_score",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>

                                  <div className="flex items-center justify-center md:justify-end gap-3 text-center md:text-right">
                                    <span className="font-black text-xl">
                                      {match.away_team}
                                    </span>

                                    {codigoBandeira(match.away_team) ? (
                                      <img
                                        src={`https://flagcdn.com/w80/${codigoBandeira(
                                          match.away_team
                                        )}.png`}
                                        alt={match.away_team}
                                        className="w-10 md:w-12 h-7 md:h-8 object-cover rounded shadow-sm"
                                      />
                                    ) : (
                                      <span className="text-2xl">🏳️</span>
                                    )}
                                  </div>
                                </div>

                                <div className="mt-4 text-center">
                                  <p className="text-sm font-bold text-black/50">
                                    {formatarDataHora(match.match_date)}
                                  </p>

                                  {!assinante ? (
                                    <div className="mt-3">
                                      <p className="text-[#D4AF37] font-black text-sm">
                                        🔒 Assine para salvar seus palpites
                                      </p>

                                      <a
                                        href={userId ? "/pagamento" : "/cadastro"}
                                        className="inline-block mt-3 bg-[#0B6E4F] text-white px-5 py-3 rounded-2xl font-black text-sm"
                                      >
                                        Liberar palpites
                                      </a>
                                    </div>
                                  ) : palpiteBloqueado(match.match_date) ? (
                                    <p className="text-red-600 font-bold text-sm mt-2">
                                      🔒 Palpites encerrados para este jogo
                                    </p>
                                  ) : (
                                    <p className="text-[#0B6E4F] font-bold text-sm mt-2">
                                      ⏳ Palpites liberados até 30 minutos antes
                                      do jogo
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {assinante ? (
          <button
            onClick={salvarPalpites}
            className="w-full bg-[#0B6E4F] text-white rounded-2xl py-4 font-black mt-10"
          >
            Salvar Palpites
          </button>
        ) : (
          <a
            href={userId ? "/pagamento" : "/cadastro"}
            className="block text-center w-full bg-[#0B6E4F] text-white rounded-2xl py-4 font-black mt-10"
          >
            {userId ? "Liberar meus palpites" : "Criar conta e participar"}
          </a>
        )}
      </div>
    </main>
  );
}