"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function enviarLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.clubedascopas.com.br/redefinir-senha",
    });

    setLoading(false);

    if (error) {
      alert("Erro ao enviar link de recuperação.");
      return;
    }

    setEnviado(true);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6 py-16">
      <form
        onSubmit={enviarLink}
        className="w-full max-w-md bg-white border rounded-3xl p-8 shadow-sm"
      >
        <h1 className="text-4xl font-black text-center text-black">
          Recuperar senha
        </h1>

        <p className="text-gray-600 text-center mt-3">
          Informe seu e-mail para receber o link de redefinição.
        </p>

        {enviado ? (
          <div className="mt-8 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 text-center font-bold">
            Link enviado! Verifique seu e-mail.
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40 outline-none focus:border-[#0B6E4F]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0B6E4F] text-white py-4 rounded-2xl font-black disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar link"}
            </button>
          </div>
        )}

        <a
          href="/login"
          className="block text-center text-sm font-bold text-[#0B6E4F] hover:underline mt-6"
        >
          Voltar para login
        </a>
      </form>
    </main>
  );
}