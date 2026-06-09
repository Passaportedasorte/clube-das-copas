export default function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#031D15] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border border-[#D4AF37]/40 bg-[#063A2A] flex items-center justify-center">
                <span className="text-xl">🏆</span>
              </div>

              <div>
                <p className="font-black text-white text-lg">
                  CLUBE DAS COPAS
                </p>

                <p className="text-xs text-[#D4AF37] font-black tracking-[0.25em]">
                  COPA 2026
                </p>
              </div>
            </div>

            <p className="mt-5 text-white/60 max-w-sm">
              A Copa começa antes da bola rolar.
            </p>

            <p className="mt-2 text-white/40 text-sm">
              A Copa é do mundo. A disputa é nossa.
            </p>
          </div>

          <div>
            <h3 className="text-white font-black mb-4">
              Informações
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="/faq"
                className="text-white/60 hover:text-[#D4AF37]"
              >
                FAQ
              </a>

              <a
                href="/termos"
                className="text-white/60 hover:text-[#D4AF37]"
              >
                Termos de Uso
              </a>

              <a
                href="/politica"
                className="text-white/60 hover:text-[#D4AF37]"
              >
                Política de Privacidade
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-black mb-4">
              Comunidade
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://chat.whatsapp.com/IHe3sQJi7Af69b9dYp1FL1?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D4AF37]"
              >
                Grupo Oficial
              </a>

              <a
                href="https://instagram.com/clubedascopas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D4AF37]"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">
            © 2026 Clube das Copas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}