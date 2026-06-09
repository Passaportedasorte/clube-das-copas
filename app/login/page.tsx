"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setLoading(false);

    if (error) {
      alert("E-mail ou senha inválidos.");
      return;
    }

    window.location.href = "/jogos";
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6 py-16">
      <form
        onSubmit={entrar}
        className="w-full max-w-md bg-white border rounded-3xl p-8 shadow-sm"
      >
        <h1 className="text-4xl font-black text-center text-black">
          Entrar
        </h1>

        <p className="text-gray-600 text-center mt-3">
          Acesse sua conta no Clube das Copas.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40 outline-none focus:border-[#0B6E4F]"
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40 outline-none focus:border-[#0B6E4F]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B6E4F] text-white py-4 rounded-2xl font-black disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <a
            href="/recuperar-senha"
            className="block text-center text-sm font-bold text-[#0B6E4F] hover:underline"
          >
            Esqueci minha senha
          </a>
        </div>

        <p className="text-center text-sm text-black/60 mt-6">
          Ainda não tem conta?{" "}
          <a href="/cadastro" className="font-black text-[#0B6E4F]">
            Criar conta
          </a>
        </p>
      </form>
    </main>
  );
}