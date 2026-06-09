"use client";

import Link from "next/link";

export default function LigasPage() {
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
            colegas de trabalho ou grupo de futebol. Além do Ranking
            Geral, você também poderá competir dentro da sua própria
            liga.
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
                Crie sua própria liga e convide seus amigos para
                competir.
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
                Possui um código? Solicite entrada em uma liga já
                existente.
              </p>
            </Link>
          </div>

          <div className="mt-10 bg-[#FAFAF7] border rounded-3xl p-6">
            <h3 className="font-black text-xl text-[#063F2F]">
              Como funciona?
            </h3>

            <div className="mt-4 space-y-3 text-black/70">
              <p>
                ✅ Continue participando normalmente do Ranking Geral.
              </p>

              <p>
                ✅ Crie ligas privadas para competir apenas com seus
                amigos.
              </p>

              <p>
                ✅ Convide participantes através do código da liga.
              </p>

              <p>
                ✅ Acompanhe uma classificação exclusiva da sua liga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}