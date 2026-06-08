"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MeusPalpites() {
  const [palpites, setPalpites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data } = await supabase
      .from("predictions")
      .select(`
        *,
        matches (
          home_team,
          away_team,
          match_date
        )
      `)
      .eq("user_id", userData.user.id);

    setPalpites(data || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen p-10">
        Carregando...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-4xl font-black mt-3">
          Meus Palpites
        </h1>

        <p className="text-black/60 mt-2">
          Confira todos os seus palpites realizados.
        </p>

        <div className="mt-8 space-y-4">
          {palpites.length === 0 && (
            <div className="bg-white border rounded-3xl p-8 text-center">
              Nenhum palpite realizado ainda.
            </div>
          )}

          {palpites.map((palpite) => (
            <div
              key={palpite.id}
              className="bg-white border rounded-3xl p-5"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-3">
                <div>
                  <p className="font-black text-lg">
                    {palpite.matches?.home_team} x{" "}
                    {palpite.matches?.away_team}
                  </p>

                  <p className="text-black/50 text-sm">
                    {new Date(
                      palpite.matches?.match_date
                    ).toLocaleString("pt-BR")}
                  </p>
                </div>

                <div className="text-2xl font-black text-[#0B6E4F]">
                  {palpite.home_score} x {palpite.away_score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}