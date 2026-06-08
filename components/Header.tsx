"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(false);

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
    <header className="w-full bg-white border-b px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="/" className="font-black text-[#0B6E4F]">
          🏆 Clube das Copas
        </a>

        <div className="flex items-center gap-6">
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
              <span className="text-sm text-black/60">{email}</span>

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
    </header>
  );
}