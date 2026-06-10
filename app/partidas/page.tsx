"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PartidasPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: true });

    setMatches(data || []);
    setLoading(false);
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

  const jogosPorRodada = matches.reduce((acc: any, match) => {
    const rodada = match.round_name || match.round || "Fase de Grupos";

    if (!acc[rodada]) acc[rodada] = [];
    acc[rodada].push(match);

    return acc;
  }, {});

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        Carregando jogos...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-6 py-10 text-[#111111]">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-4xl font-black mt-3 text-[#063F2F]">
          Jogos e Resultados
        </h1>

        <p className="text-black/60 mt-2">
          Acompanhe os jogos da Copa e os resultados cadastrados pela organização.
        </p>

        <div className="mt-8 space-y-6">
          {Object.entries(jogosPorRodada).map(([rodada, jogos]: any) => (
            <section
              key={rodada}
              className="bg-white border rounded-3xl overflow-hidden"
            >
              <div className="p-6 border-b">
                <h2 className="text-2xl font-black text-[#063F2F]">
                  {rodada}
                </h2>

                <p className="text-sm text-black/50 font-bold mt-1">
                  {jogos.length} jogos
                </p>
              </div>

              <div className="divide-y">
                {jogos.map((match: any) => {
                  const finalizado =
                    match.status === "finished" ||
                    (match.home_score !== null && match.away_score !== null);

                  return (
                    <div
                      key={match.id}
                      className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div className="flex-1 text-center md:text-left">
                        <p className="font-black text-lg">
                          {match.home_team}
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-black text-[#063F2F]">
                          {finalizado
                            ? `${match.home_score} x ${match.away_score}`
                            : "x"}
                        </div>

                        <p className="text-xs text-black/50 font-bold mt-1">
                          {formatarDataHora(match.match_date)}
                        </p>

                        <p
                          className={`text-xs font-black mt-2 ${
                            finalizado
                              ? "text-[#0B6E4F]"
                              : "text-[#D4AF37]"
                          }`}
                        >
                          {finalizado ? "🏁 Finalizado" : "⏳ Em breve"}
                        </p>
                      </div>

                      <div className="flex-1 text-center md:text-right">
                        <p className="font-black text-lg">
                          {match.away_team}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 text-center bg-[#063A2A] text-white rounded-3xl p-8">
          <h2 className="text-3xl font-black">
            Quer disputar o ranking?
          </h2>

          <p className="text-white/70 mt-2">
            Faça seus palpites e concorra aos R$ 10.000 em premiação.
          </p>

          <a
            href="/jogos"
            className="inline-block mt-6 bg-[#0B6E4F] text-white px-8 py-4 rounded-2xl font-black"
          >
            Fazer meus palpites
          </a>
        </div>
      </div>
    </main>
  );
}