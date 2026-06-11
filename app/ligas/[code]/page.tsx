"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LigaDetalhePage() {
  const params = useParams();
  const code = String(params.code || "").toUpperCase();

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [liga, setLiga] = useState<any>(null);
  const [ranking, setRanking] = useState<any[]>([]);
  const [pendentes, setPendentes] = useState<any[]>([]);
  const [podeGerenciar, setPodeGerenciar] = useState(false);
  const [souMembro, setSouMembro] = useState(false);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    setUserId(userData.user.id);

    const { data: ligaData } = await supabase
      .from("leagues")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    if (!ligaData) {
      setLiga(null);
      setLoading(false);
      return;
    }

    setLiga(ligaData);

    const { data: meuVinculo } = await supabase
      .from("league_members")
      .select("*")
      .eq("league_id", ligaData.id)
      .eq("user_id", userData.user.id)
      .maybeSingle();

    const gerencia =
      ligaData.owner_id === userData.user.id || meuVinculo?.role === "admin";

    setPodeGerenciar(gerencia);
    setSouMembro(meuVinculo?.status === "approved");

    await carregarRanking(ligaData.id);
    await carregarPendentes(ligaData.id, gerencia);

    setLoading(false);
  }

  async function carregarRanking(leagueId: string) {
    const { data: membros } = await supabase
      .from("league_members")
      .select(`
        id,
        user_id,
        role,
        profiles (
          id,
          nome,
          username
        )
      `)
      .eq("league_id", leagueId)
      .eq("status", "approved");

    const rankingComPontos = await Promise.all(
      (membros || []).map(async (membro: any) => {
        const { data: palpites } = await supabase
          .from("predictions")
          .select("points")
          .eq("user_id", membro.user_id);

        const pontos = (palpites || []).reduce(
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
          id: membro.user_id,
          memberId: membro.id,
          role: membro.role,
          nome:
            membro.profiles?.username ||
            membro.profiles?.nome ||
            "Participante",
          pontos,
          placaresExatos,
          acertosResultado,
        };
      })
    );

    const ordenado = rankingComPontos.sort((a, b) => {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      if (b.placaresExatos !== a.placaresExatos) {
        return b.placaresExatos - a.placaresExatos;
      }
      if (b.acertosResultado !== a.acertosResultado) {
        return b.acertosResultado - a.acertosResultado;
      }

      return String(a.nome || "").localeCompare(String(b.nome || ""));
    });

    setRanking(ordenado);
  }

  async function carregarPendentes(leagueId: string, gerencia: boolean) {
    if (!gerencia) {
      setPendentes([]);
      return;
    }

    const { data } = await supabase
      .from("league_members")
      .select(`
        id,
        user_id,
        profiles (
          id,
          nome,
          username,
          email
        )
      `)
      .eq("league_id", leagueId)
      .eq("status", "pending");

    setPendentes(data || []);
  }

  async function aceitar(memberId: string) {
    await supabase
      .from("league_members")
      .update({ status: "approved" })
      .eq("id", memberId);

    await carregar();
  }

  async function recusar(memberId: string) {
    await supabase
      .from("league_members")
      .update({ status: "rejected" })
      .eq("id", memberId);

    await carregar();
  }

  async function remover(memberId: string) {
    const confirmar = confirm(
      "Tem certeza que deseja remover este participante da liga?"
    );

    if (!confirmar) return;

    await supabase
      .from("league_members")
      .delete()
      .eq("id", memberId);

    await carregar();
  }

  async function copiarCodigo() {
    await navigator.clipboard.writeText(liga.code);
    alert("Código copiado!");
  }

  async function copiarLink() {
    await navigator.clipboard.writeText(
      `https://www.clubedascopas.com.br/ligas/${liga.code}`
    );
    alert("Link copiado!");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Carregando...
      </main>
    );
  }

  if (!liga) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] px-6 py-10">
        <div className="max-w-xl mx-auto bg-white border rounded-3xl p-8 text-center">
          <h1 className="text-3xl font-black text-black">
            Liga não encontrada
          </h1>

          <a
            href="/ligas"
            className="inline-block mt-6 bg-[#0B6E4F] text-white px-6 py-3 rounded-2xl font-black"
          >
            Voltar
          </a>
        </div>
      </main>
    );
  }

  if (!souMembro && !podeGerenciar) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] px-6 py-10">
        <div className="max-w-xl mx-auto bg-white border rounded-3xl p-8 text-center">
          <h1 className="text-3xl font-black text-black">
            Acesso pendente
          </h1>

          <p className="text-black/60 mt-3">
            Sua entrada nessa liga ainda precisa ser aprovada por um administrador.
          </p>

          <a
            href="/ligas"
            className="inline-block mt-6 bg-[#0B6E4F] text-white px-6 py-3 rounded-2xl font-black"
          >
            Voltar para Ligas
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border rounded-3xl p-8">
          <p className="text-[#0B6E4F] font-black text-sm">
            LIGA PRIVADA
          </p>

          <h1 className="text-4xl font-black mt-3 text-[#063F2F]">
            🏆 {liga.name}
          </h1>

          <p className="text-black/60 mt-2">
            Ranking exclusivo dos participantes desta liga.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-[#FAFAF7] border rounded-3xl p-5">
              <p className="text-black/50 font-bold text-sm">
                Participantes
              </p>
              <p className="text-3xl font-black text-[#0B6E4F] mt-2">
                {ranking.length}
              </p>
            </div>

            <div className="bg-[#FAFAF7] border rounded-3xl p-5">
              <p className="text-black/50 font-bold text-sm">
                Código da Liga
              </p>
              <p className="text-3xl font-black text-[#D4AF37] mt-2">
                {liga.code}
              </p>
            </div>

            <div className="bg-[#FAFAF7] border rounded-3xl p-5">
              <p className="text-black/50 font-bold text-sm">
                Seu acesso
              </p>
              <p className="text-3xl font-black text-[#063F2F] mt-2">
                {podeGerenciar ? "Admin" : "Membro"}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mt-6">
            <button
              onClick={copiarCodigo}
              className="bg-[#0B6E4F] text-white rounded-2xl py-4 font-black"
            >
              Copiar código
            </button>

            <button
              onClick={copiarLink}
              className="border-2 border-[#0B6E4F] text-[#0B6E4F] rounded-2xl py-4 font-black"
            >
              Copiar link da liga
            </button>
          </div>
        </div>

        {podeGerenciar && pendentes.length > 0 && (
          <div className="mt-8 bg-white border rounded-3xl p-8">
            <h2 className="text-2xl font-black text-[#063F2F]">
              Solicitações pendentes
            </h2>

            <div className="mt-5 space-y-4">
              {pendentes.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#FAFAF7] border rounded-2xl p-4"
                >
                  <div>
                    <p className="font-black">
                      {item.profiles?.username ||
                        item.profiles?.nome ||
                        "Participante"}
                    </p>

                    <p className="text-sm text-black/50">
                      {item.profiles?.email}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => aceitar(item.id)}
                      className="bg-[#0B6E4F] text-white px-5 py-3 rounded-xl font-black"
                    >
                      Aceitar
                    </button>

                    <button
                      onClick={() => recusar(item.id)}
                      className="bg-red-50 text-red-600 px-5 py-3 rounded-xl font-black"
                    >
                      Recusar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-white border rounded-3xl overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-black text-[#063F2F]">
              Ranking da Liga
            </h2>
          </div>

          {ranking.length === 0 ? (
            <div className="p-8 text-center text-black/60">
              Nenhum participante aprovado ainda.
            </div>
          ) : (
            ranking.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-5 border-b last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <span className="font-black text-[#D4AF37] w-10">
                    #{index + 1}
                  </span>

                  <div>
                    <p className="font-black">
                      {item.nome}{" "}
                      {item.role === "admin" && (
                        <span className="text-xs text-[#D4AF37]">
                          ADMIN
                        </span>
                      )}
                    </p>

                    <p className="text-xs text-black/50 mt-1">
                      Exatos: {item.placaresExatos} • Resultado:{" "}
                      {item.acertosResultado}
                    </p>

                    {podeGerenciar && item.id !== userId && (
                      <button
                        onClick={() => remover(item.memberId)}
                        className="mt-2 text-xs font-black text-red-600 hover:underline"
                      >
                        Remover da liga
                      </button>
                    )}
                  </div>
                </div>

                <span className="font-black text-[#0B6E4F]">
                  {item.pontos} pts
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}