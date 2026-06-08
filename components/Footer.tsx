export default function Footer() {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-[#0B6E4F]">
              🏆 Clube das Copas
            </p>

            <p className="text-sm text-black/60 mt-1">
              Copa do Mundo 2026
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="/termos"
              className="text-black/70 hover:text-[#0B6E4F]"
            >
              Termos de Uso
            </a>

            <a
              href="/politica"
              className="text-black/70 hover:text-[#0B6E4F]"
            >
              Política de Privacidade
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t text-center text-xs text-black/50">
          © 2026 Clube das Copas. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}