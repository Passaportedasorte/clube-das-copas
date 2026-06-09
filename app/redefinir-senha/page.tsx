"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RedefinirSenha() {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function redefinir(e: React.FormEvent) {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não conferem.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: senha,
    });

    setLoading(false);

    if (error) {
      alert("Erro ao redefinir senha.");
      return;
    }

    alert("Senha redefinida com sucesso!");
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-[#031D15] flex items-center justify-center px-6 py-12">
      <form
        onSubmit={redefinir}
        className="bg-white border rounded-3xl p-8 max-w-md w-full"
        style={{ colorScheme: "light" }}
      >
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-3xl font-black mt-3 text-black">
          Redefinir senha
        </h1>

        <p className="text-gray-600 mt-2">
          Digite sua nova senha para acessar sua conta.
        </p>

        <input
          type="password"
          required
          placeholder="Nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full border rounded-2xl px-4 py-4 mt-6 bg-white text-black placeholder:text-black/40"
        />

        <input
          type="password"
          required
          placeholder="Confirmar nova senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="w-full border rounded-2xl px-4 py-4 mt-4 bg-white text-black placeholder:text-black/40"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-[#0B6E4F] text-white rounded-2xl py-4 font-black disabled:opacity-60"
        >
          {loading ? "Salvando..." : "Salvar nova senha"}
        </button>
      </form>
    </main>
  );
}