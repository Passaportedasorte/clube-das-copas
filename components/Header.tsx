"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
const [menuUsuarioAberto, setMenuUsuarioAberto] = useState(false);

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

  const linkClass =
    "font-bold text-white/80 hover:text-[#D4AF37] transition";

  const mobileLinkClass =
    "font-bold text-white bg-white/10 border border-white/10 rounded-xl px-4 py-3";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#031D15]/95 backdrop-blur border-b border-[#D4AF37]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <a
          href="/"
          className="flex items-center gap-3 whitespace-nowrap"
        >
          <div className="h-10 w-10 rounded-full border border-[#D4AF37]/40 bg-[#063A2A] flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.18)]">
            <span className="text-xl">🏆</span>
          </div>

          <div className="leading-none">
            <p className="font-black text-white text-sm sm:text-lg tracking-wide">
              CLUBE DAS COPAS
            </p>
            <p className="hidden sm:block text-[10px] text-[#D4AF37] font-black tracking-[0.25em] mt-1">
              COPA 2026
            </p>
          </div>
        </a>

        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden bg-[#0B6E4F] text-white px-4 py-2 rounded-xl font-black text-sm border border-white/10"
        >
          {menuAberto ? "Fechar" : "Menu"}
        </button>

        <div className="hidden md:flex items-center gap-6">
          <a href="/partidas" className={linkClass}>
  Jogos
</a>

<a href="/jogos" className={linkClass}>
  Palpites
</a>

          <a href="/ranking" className={linkClass}>
            Ranking
          </a>

          <a href="/ligas" className={linkClass}>
  Ligas
</a>

          <a href="/premiacao" className={linkClass}>
            Premiação
          </a>

          {!active && (
  <a href="/pagamento" className={linkClass}>
    Assinatura
  </a>
)}

          {email ? (
            <>
              <div className="relative">
  <button
    onClick={() => setMenuUsuarioAberto(!menuUsuarioAberto)}
    className="max-w-[220px] truncate text-sm text-white/70 hover:text-white font-medium"
  >
    {email} ▾
  </button>

  {menuUsuarioAberto && (
    <div className="absolute right-0 top-full mt-3 w-56 bg-[#063A2A] border border-[#D4AF37]/20 rounded-2xl shadow-xl overflow-hidden">
      <a
        href="/meus-dados"
        className="block px-4 py-3 text-white hover:bg-white/10"
      >
        👤 Meus Dados
      </a>

      <a
        href="/redefinir-senha"
        className="block px-4 py-3 text-white hover:bg-white/10"
      >
        🔒 Redefinir Senha
      </a>

      <button
        onClick={sair}
        className="w-full text-left px-4 py-3 text-red-300 hover:bg-red-500/10"
      >
        🚪 Sair
      </button>
    </div>
  )}
</div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <a href="/login" className={linkClass}>
                Entrar
              </a>

              <a
                href="/cadastro"
                className="bg-[#0B6E4F] hover:bg-[#0D8A63] text-white px-4 py-2 rounded-xl font-black text-sm border border-white/10 transition"
              >
                Criar conta
              </a>
            </div>
          )}
        </div>
      </div>

      {menuAberto && (
        <div className="md:hidden bg-[#031D15] border-t border-[#D4AF37]/20 px-4 pb-5 shadow-lg">
          <div className="flex flex-col gap-3 pt-4">
            <a href="/partidas" className={mobileLinkClass}>
  Jogos
</a>

<a href="/jogos" className={mobileLinkClass}>
  Palpites
</a>
            <a href="/ranking" className={mobileLinkClass}>
              Ranking
            </a>

<a href="/ligas" className={mobileLinkClass}>
  Ligas
</a>
            <a href="/premiacao" className={mobileLinkClass}>
              Premiação
            </a>

            {!active && (
  <a
    href="/pagamento"
    className="font-black text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-xl px-4 py-3"
  >
    Assinatura
  </a>
)}

            {email ? (
              <>
                <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
  <div className="px-4 py-3 text-xs text-white/50 break-all">
    {email}
  </div>

  <a
    href="/meus-dados"
    className="block px-4 py-3 text-white border-t border-white/10"
  >
    👤 Meus Dados
  </a>

  <a
    href="/redefinir-senha"
    className="block px-4 py-3 text-white border-t border-white/10"
  >
    🔒 Redefinir Senha
  </a>

  <button
    onClick={sair}
    className="w-full text-left px-4 py-3 text-red-300 border-t border-white/10"
  >
    🚪 Sair
  </button>
</div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/login"
                  className="border-2 border-[#D4AF37] text-[#D4AF37] px-4 py-3 rounded-xl font-black text-center"
                >
                  Entrar
                </a>

                <a
                  href="/cadastro"
                  className="bg-[#0B6E4F] text-white px-4 py-3 rounded-xl font-black text-center"
                >
                  Criar conta
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}