"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LigasPage() {
  const [loading, setLoading] = useState(true);
  const [minhasLigas, setMinhasLigas] = useState<any[]>([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("league_members")
      .select(`
        status,
        leagues (
          id,
          name,
          code,
          owner_id,
          is_private
        )
      `)
      .eq("user_id", userData.user.id)
      .in("status", ["approved", "pending"]);

    setMinhasLigas(data || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border rounded-3xl p-8">
          <p className="text-[#0B6E4F] font-black text-sm">
            CLUBE DAS COPAS 2026
          </p>

          <h1 className="text-4xl font-black mt-3 text-[#063F2F]">
            Ligas Privadas
          </h1>

          <p className="text-black/60 mt-3 max-w-2xl">
            Crie uma liga para disputar com seus amigos, familiares,
            colegas de trabalho ou grupo de futebol. Além do Ranking Geral,
            você também pode competir dentro da sua própria liga.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Link
              href="/ligas/criar"
              className="bg-[#0B6E4F] text-white rounded-3xl p-6 hover:opacity-90 transition"
            >
              <p className="text-3xl">🏆</p>

              <h2 className="font-black text-xl mt-3">
                Criar Liga
              </h2>

              <p className="text-white/80 mt-2 text-sm">
                Crie sua própria liga e convide seus amigos para competir.
              </p>
            </Link>

            <Link
              href="/ligas/entrar"
              className="border rounded-3xl p-6 hover:border-[#0B6E4F] transition"
            >
              <p className="text-3xl">⚽</p>

              <h2 className="font-black text-xl mt-3">
                Entrar em Liga
              </h2>

              <p className="text-black/60 mt-2 text-sm">
                Possui um código? Solicite entrada em uma liga já existente.
              </p>
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-white border rounded-3xl p-8">
          <h2 className="text-2xl font-black text-[#063F2F]">
            Minhas Ligas
          </h2>

          {loading ? (
            <p className="text-black/60 mt-4">
              Carregando...
            </p>
          ) : minhasLigas.length === 0 ? (
            <p className="text-black/60 mt-4">
              Você ainda não participa de nenhuma liga.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {minhasLigas.map((item: any, index) => (
                <Link
                  key={index}
                  href={`/ligas/${item.leagues?.code}`}
                  className="block bg-[#FAFAF7] border rounded-2xl p-5 hover:border-[#0B6E4F] transition"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-black text-[#063F2F]">
                        {item.leagues?.name}
                      </p>

                      <p className="text-sm text-black/50 mt-1">
                        Código: {item.leagues?.code}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-black px-3 py-2 rounded-full ${
                        item.status === "approved"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {item.status === "approved"
                        ? "Aprovado"
                        : "Pendente"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-white border rounded-3xl p-8">
          <h3 className="font-black text-xl text-[#063F2F]">
            Como funciona?
          </h3>

          <div className="mt-4 space-y-3 text-black/70">
            <p>✅ Continue participando normalmente do Ranking Geral.</p>
            <p>✅ Crie ligas privadas para competir apenas com seus amigos.</p>
            <p>✅ Convide participantes através do código da liga.</p>
            <p>✅ Acompanhe uma classificação exclusiva da sua liga.</p>
          </div>
        </div>
      </div>
    </main>
  );
}