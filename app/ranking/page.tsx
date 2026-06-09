"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const premios = [
  "R$ 5.000",
  "R$ 2.500",
  "R$ 1.500",
  "R$ 600",
  "R$ 400",
];

export default function Ranking() {
  const [ranking, setRanking] = useState<any[]>([]);
  const [minhaPosicao, setMinhaPosicao] = useState<any>(null);

  useEffect(() => {
    async function carregarRanking() {
      const { data } = await supabase
        .from("profiles")
        .select("id, nome, username, active")
        .eq("active", true);

      const participantes = data || [];

      const rankingComPontos = await Promise.all(
  participantes.map(async (p) => {
    const { data: palpites } = await supabase
      .from("predictions")
      .select("points")
      .eq("user_id", p.id);

    const total = (palpites || []).reduce(
      (soma, item) => soma + (item.points || 0),
      0
    );

    const placaresExatos = (palpites || []).filter(
      (item) => item.points === 10
    ).length;

    const acertosResultado = (palpites || []).filter(
      (item) => item.points === 3
    ).length;

    return {
      id: p.id,
      nome: p.username || p.nome,
      pontos: total,
      placaresExatos,
      acertosResultado,
    };
  })
);

const rankingOrdenado = rankingComPontos.sort((a, b) => {
  if (b.pontos !== a.pontos) {
    return b.pontos - a.pontos;
  }

  if (b.placaresExatos !== a.placaresExatos) {
    return b.placaresExatos - a.placaresExatos;
  }

  if (b.acertosResultado !== a.acertosResultado) {
    return b.acertosResultado - a.acertosResultado;
  }

  return String(a.nome || "").localeCompare(String(b.nome || ""));
});

setRanking(rankingOrdenado);

const { data: userData } = await supabase.auth.getUser();

if (userData.user) {
  const posicao = rankingOrdenado.findIndex(
    (item) => item.id === userData.user?.id
  );

  if (posicao >= 0) {
    setMinhaPosicao({
      posicao: posicao + 1,
      pontos: rankingOrdenado[posicao].pontos,
    });
  }
}
    }

    carregarRanking();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-6 py-10 text-[#111111]">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-4xl font-black mt-3">Ranking Geral</h1>

        <p className="text-black/60 mt-2">
          Acompanhe a classificação dos participantes na competição.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white border rounded-3xl p-6">
            <p className="text-black/50 font-bold">Participantes</p>
            <p className="text-3xl font-black mt-2">{ranking.length}</p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-black/50 font-bold">Premiação total</p>
            <p className="text-3xl font-black text-[#0B6E4F] mt-2">
              R$ 10.000
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-black/50 font-bold">Líder atual</p>
            <p className="text-3xl font-black text-[#D4AF37] mt-2">
              {ranking[0]?.pontos ?? 0} pts
            </p>
          </div>
        </div>

        {minhaPosicao && (
  <div className="mt-8 bg-[#0B6E4F] text-white rounded-3xl p-6">
    <p className="text-white/70 font-bold">Sua posição atual</p>
    <p className="text-3xl font-black mt-2">
      #{minhaPosicao.posicao} — {minhaPosicao.pontos} pts
    </p>
  </div>
)}

        <div className="mt-10 bg-white border rounded-3xl overflow-hidden">
          {ranking.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-5 border-b last:border-b-0 ${
                index < 5 ? "bg-[#D4AF37]/10" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="font-black text-[#D4AF37] w-10">
                  #{index + 1}
                </span>

                <div>
                  <p className="font-black">{item.nome}</p>
<p className="text-xs text-black/50 mt-1">
  Exatos: {item.placaresExatos} • Resultado: {item.acertosResultado}
</p>
                  {index < 5 && (
                    <p className="text-sm text-[#0B6E4F] font-bold">
                      Premiação atual: {premios[index]}
                    </p>
                  )}
                </div>
              </div>

              <span className="font-black text-[#0B6E4F]">
                {item.pontos} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}