"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CriarLigaPage() {
  const [nome, setNome] = useState("");
  const [privada, setPrivada] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ligaCriada, setLigaCriada] = useState<any>(null);

  function gerarCodigo() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const base = letras + numeros;

    let codigo = "";

    for (let i = 0; i < 6; i++) {
      codigo += base[Math.floor(Math.random() * base.length)];
    }

    return codigo;
  }

  async function criarLiga(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const codigo = gerarCodigo();

    const { data: liga, error } = await supabase
      .from("leagues")
      .insert({
        name: nome,
        code: codigo,
        owner_id: userData.user.id,
        is_private: privada,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    await supabase.from("league_members").insert({
      league_id: liga.id,
      user_id: userData.user.id,
      status: "approved",
    });

    setLigaCriada(liga);
    setLoading(false);
  }

  async function copiarCodigo() {
    if (!ligaCriada?.code) return;

    await navigator.clipboard.writeText(ligaCriada.code);
    alert("Código copiado!");
  }

  async function copiarLink() {
    if (!ligaCriada?.code) return;

    await navigator.clipboard.writeText(
      `https://clubedascopas.com.br/ligas/${ligaCriada.code}`
    );

    alert("Link copiado!");
  }

  if (ligaCriada) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] px-6 py-10">
        <div className="max-w-xl mx-auto bg-white border rounded-3xl p-8 text-center">
          <p className="text-5xl">🏆</p>

          <h1 className="text-3xl font-black mt-4 text-[#063F2F]">
            Liga criada com sucesso!
          </h1>

          <p className="text-black/60 mt-3">
            Compartilhe o código com seus amigos para eles solicitarem entrada.
          </p>

          <div className="mt-6 bg-[#063A2A] text-[#D4AF37] rounded-3xl p-6">
            <p className="text-sm font-bold text-white/60">
              Código da Liga
            </p>

            <p className="text-4xl font-black mt-2 tracking-widest">
              {ligaCriada.code}
            </p>
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
              Copiar link
            </button>
          </div>

          <a
            href={`/ligas/${ligaCriada.code}`}
            className="block mt-5 text-[#0B6E4F] font-black"
          >
            Ir para minha liga
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-6 py-10">
      <div className="max-w-xl mx-auto bg-white border rounded-3xl p-8">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-4xl font-black mt-3 text-[#063F2F]">
          Criar Liga
        </h1>

        <p className="text-black/60 mt-3">
          Crie uma liga privada para disputar o ranking com seus amigos.
        </p>

        <form onSubmit={criarLiga} className="mt-8 space-y-5">
          <div>
            <label className="block font-bold text-sm mb-2">
              Nome da Liga
            </label>

            <input
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Amigos do Churrasco"
              className="w-full border rounded-2xl px-4 py-4"
            />
          </div>

          <label className="flex items-start gap-3 bg-[#FAFAF7] border rounded-2xl p-4">
            <input
              type="checkbox"
              checked={privada}
              onChange={(e) => setPrivada(e.target.checked)}
              className="mt-1"
            />

            <div>
              <p className="font-black">
                Liga privada
              </p>

              <p className="text-sm text-black/60 mt-1">
                Novos participantes precisam ser aprovados por você antes de
                aparecerem no ranking da liga.
              </p>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B6E4F] text-white rounded-2xl py-4 font-black disabled:opacity-60"
          >
            {loading ? "Criando..." : "Criar Liga"}
          </button>
        </form>
      </div>
    </main>
  );
}