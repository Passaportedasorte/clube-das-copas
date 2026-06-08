"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase.auth.getUser();

      setEmail(data.user?.email || "");

      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("active")
          .eq("id", data.user.id)
          .single();

        setActive(!!profile?.active);
      }
    }

    carregar();
  }, []);

  async function sair() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-black/10 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <a
          href="/"
          className="font-black text-[#0B6E4F] text-base sm:text-xl whitespace-nowrap"
        >
          🏆 Clube das Copas
        </a>

        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden bg-[#0B6E4F] text-white px-4 py-2 rounded-xl font-black text-sm"
        >
          Menu
        </button>

        <div className="hidden md:flex items-center gap-6">
          <a href="/jogos" className="font-bold hover:text-[#0B6E4F]">
            Jogos
          </a>

          <a href="/ranking" className="font-bold hover:text-[#0B6E4F]">
            Ranking
          </a>

          <a href="/premiacao" className="font-bold hover:text-[#0B6E4F]">
            Premiação
          </a>

          {active ? (
            <a href="/jogos" className="font-bold text-[#0B6E4F]">
              Minha Área
            </a>
          ) : (
            <a href="/pagamento" className="font-bold hover:text-[#0B6E4F]">
              Assinatura
            </a>
          )}

          {email ? (
            <>
              <span className="max-w-[180px] truncate text-sm text-black/60">
                {email}
              </span>

              <button
                onClick={sair}
                className="bg-black text-white px-4 py-2 rounded-xl font-bold text-sm"
              >
                Sair
              </button>
            </>
          ) : (
            <a
              href="/cadastro"
              className="bg-[#0B6E4F] text-white px-4 py-2 rounded-xl font-bold text-sm"
            >
              Entrar
            </a>
          )}
        </div>
      </div>

      {menuAberto && (
        <div className="md:hidden bg-white border-t border-black/10 px-4 pb-5 shadow-lg">
          <div className="flex flex-col gap-3 pt-4">
            <a
              href="/jogos"
              className="font-bold text-black bg-black/5 rounded-xl px-4 py-3"
            >
              Jogos
            </a>

            <a
              href="/ranking"
              className="font-bold text-black bg-black/5 rounded-xl px-4 py-3"
            >
              Ranking
            </a>

            <a
              href="/premiacao"
              className="font-bold text-black bg-black/5 rounded-xl px-4 py-3"
            >
              Premiação
            </a>

            {active ? (
              <a
                href="/jogos"
                className="font-bold text-[#0B6E4F] bg-green-50 rounded-xl px-4 py-3"
              >
                Minha Área
              </a>
            ) : (
              <a
                href="/pagamento"
                className="font-bold text-[#0B6E4F] bg-green-50 rounded-xl px-4 py-3"
              >
                Assinatura
              </a>
            )}

            {email ? (
              <>
                <span className="text-xs text-black/60 break-all px-1">
                  {email}
                </span>

                <button
                  onClick={sair}
                  className="bg-black text-white px-4 py-3 rounded-xl font-bold text-sm text-left"
                >
                  Sair
                </button>
              </>
            ) : (
              <a
                href="/cadastro"
                className="bg-[#0B6E4F] text-white px-4 py-3 rounded-xl font-black text-center"
              >
                Entrar no Clube
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}