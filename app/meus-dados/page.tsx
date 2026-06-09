"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MeusDados() {
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [profile, setProfile] = useState<any>(null);

  const [username, setUsername] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
      setUsername(profileData.username || "");
      setWhatsapp(profileData.whatsapp || "");
    }

    setLoading(false);
  }

  async function salvar() {
    if (!profile) return;

    setSalvando(true);

    const usernameLimpo = username
      .trim()
      .toLowerCase()
      .replace(/\s/g, "");

    const { data: usernameExiste } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", usernameLimpo)
      .neq("id", profile.id)
      .maybeSingle();

    if (usernameExiste) {
      alert("Este nome de usuário já está sendo utilizado.");
      setSalvando(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        username: usernameLimpo,
        whatsapp,
      })
      .eq("id", profile.id);

    setSalvando(false);

    if (error) {
      alert("Erro ao salvar dados.");
      return;
    }

    alert("Dados atualizados com sucesso!");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Carregando...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#031D15] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border p-8">
          <h1 className="text-4xl font-black text-black">
            Meus Dados
          </h1>

          <p className="text-gray-600 mt-2">
            Gerencie suas informações do Clube das Copas.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="block font-bold text-sm mb-2">
                Nome Completo
              </label>

              <input
                disabled
                value={profile?.nome || ""}
                className="w-full border rounded-2xl px-4 py-4 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-bold text-sm mb-2">
                Nome de Usuário
              </label>

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-2xl px-4 py-4"
              />
            </div>

            <div>
              <label className="block font-bold text-sm mb-2">
                E-mail
              </label>

              <input
                disabled
                value={profile?.email || ""}
                className="w-full border rounded-2xl px-4 py-4 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-bold text-sm mb-2">
                WhatsApp
              </label>

              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full border rounded-2xl px-4 py-4"
              />
            </div>

            <div>
              <label className="block font-bold text-sm mb-2">
                CPF
              </label>

              <input
                disabled
                value={profile?.cpf || ""}
                className="w-full border rounded-2xl px-4 py-4 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-bold text-sm mb-2">
                Status da Assinatura
              </label>

              <div
                className={`rounded-2xl px-4 py-4 font-black ${
                  profile?.active
                    ? "bg-green-50 text-green-700"
                    : "bg-yellow-50 text-yellow-700"
                }`}
              >
                {profile?.active
                  ? "✅ Assinatura ativa"
                  : "⏳ Pagamento pendente"}
              </div>
            </div>

            <div>
              <label className="block font-bold text-sm mb-2">
                Seu Cupom de Indicação
              </label>

              <div className="bg-[#063A2A] text-[#D4AF37] rounded-2xl px-4 py-4 font-black text-lg">
                {profile?.username
                  ? profile.username.toUpperCase()
                  : "Defina um username"}
              </div>
            </div>

            <button
              onClick={salvar}
              disabled={salvando}
              className="w-full bg-[#0B6E4F] text-white py-4 rounded-2xl font-black disabled:opacity-60"
            >
              {salvando
                ? "Salvando..."
                : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}