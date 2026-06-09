"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Cadastro() {
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [aceite, setAceite] = useState(false);

  function calcularIdade(dataNascimento: string) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  function limparUsername(valor: string) {
    return valor
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9_]/g, "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const nome = form.get("nome") as string;
    const username = limparUsername(form.get("username") as string);
    const cpf = form.get("cpf") as string;
    const dataNascimento = form.get("dataNascimento") as string;
    const whatsapp = form.get("whatsapp") as string;
    const email = form.get("email") as string;
    const senha = form.get("senha") as string;
    const confirmarSenha = form.get("confirmarSenha") as string;

    if (!aceite) {
      setErro("Você precisa aceitar os Termos de Uso e a Política de Privacidade.");
      setLoading(false);
      return;
    }

    if (!username || username.length < 3) {
      setErro("O nome de usuário precisa ter pelo menos 3 caracteres.");
      setLoading(false);
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não conferem.");
      setLoading(false);
      return;
    }

    if (calcularIdade(dataNascimento) < 18) {
      setErro("Você precisa ter 18 anos ou mais para participar.");
      setLoading(false);
      return;
    }

    const { data: usernameExiste } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (usernameExiste) {
      setErro("Este nome de usuário já está em uso. Escolha outro.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          nome,
          username,
          cpf,
          whatsapp,
          data_nascimento: dataNascimento,
        },
      },
    });

    if (error || !data.user) {
      setErro(error?.message || "Erro ao criar cadastro.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      nome,
      username,
      email,
      cpf,
      whatsapp,
      data_nascimento: dataNascimento,
    });

    if (profileError) {
      setErro(profileError.message);
      setLoading(false);
      return;
    }

    await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    window.location.href = "/jogos";
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#111111] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-3xl font-black mt-3">Criar minha conta</h1>

        <p className="text-black/60 mt-2">
          Preencha seus dados para criar sua conta.
        </p>

        {erro && (
          <div className="mt-5 bg-red-50 text-red-700 border border-red-200 rounded-2xl p-4 text-sm font-bold">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            name="nome"
            required
            placeholder="Nome completo"
            className="w-full border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40"
          />

          <div>
            <input
              name="username"
              required
              minLength={3}
              placeholder="Nome de usuário"
              onChange={(e) => {
                e.currentTarget.value = limparUsername(e.currentTarget.value);
              }}
              className="w-full border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40"
            />

            <p className="text-xs text-black/50 mt-1">
              Esse nome aparecerá publicamente no ranking. Ex: goleador2026, mestre2026.
            </p>
          </div>

          <input
            name="cpf"
            required
            placeholder="CPF"
            className="w-full border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40"
          />

          <input
            name="dataNascimento"
            required
            type="date"
            className="w-full border rounded-2xl px-4 py-4 bg-white text-black"
          />

          <input
            name="whatsapp"
            required
            placeholder="WhatsApp"
            className="w-full border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40"
          />

          <input
            name="email"
            required
            type="email"
            placeholder="E-mail"
            className="w-full border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40"
          />

          <input
            name="senha"
            required
            type="password"
            placeholder="Senha"
            className="w-full border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40"
          />

          <input
            name="confirmarSenha"
            required
            type="password"
            placeholder="Confirmar senha"
            className="w-full border rounded-2xl px-4 py-4 bg-white text-black placeholder:text-black/40"
          />

          <div className="flex items-start gap-3 mt-4">
            <input
              type="checkbox"
              id="aceite"
              checked={aceite}
              onChange={(e) => setAceite(e.target.checked)}
              className="mt-1"
            />

            <label htmlFor="aceite" className="text-sm text-black/70">
              Li e aceito os{" "}
              <a href="/termos" target="_blank" className="font-bold text-[#0B6E4F]">
                Termos de Uso
              </a>{" "}
              e a{" "}
              <a href="/politica" target="_blank" className="font-bold text-[#0B6E4F]">
                Política de Privacidade
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B6E4F] text-white rounded-2xl py-4 font-black disabled:opacity-60"
          >
            {loading ? "Criando conta..." : "Continuar"}
          </button>
        </form>
      </div>
    </main>
  );
}