export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#111111]">
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-14 md:py-20">
        <div className="text-center max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#0B6E4F] border border-[#D4AF37]/40 px-5 py-2 rounded-full font-black text-sm">
            🏆 Clube Oficial da Copa do Mundo 2026
          </span>

          <h1 className="mt-8 text-4xl md:text-7xl font-black leading-tight">
            Dê seus palpites na Copa e concorra a
            <span className="block text-[#0B6E4F]">
              R$ 10.000 em prêmios
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-7 text-lg md:text-xl text-black/70 leading-relaxed">
            Entre para o Clube das Copas, palpite nos jogos da Copa do Mundo
            2026, acumule pontos no ranking e dispute a premiação final.
          </p>

          <div className="mt-8 inline-flex flex-col md:flex-row items-center justify-center gap-3 bg-white border rounded-3xl p-4 shadow-sm">
            <div className="font-black text-[#0B6E4F]">
              Placar exato: 10 pontos
            </div>

            <div className="hidden md:block text-black/20 font-black">|</div>

            <div className="font-black text-[#0B6E4F]">
              Acertou vencedor ou empate: 3 pontos
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
            <a
              href="/cadastro"
              className="bg-[#0B6E4F] hover:opacity-90 transition text-white px-10 py-5 rounded-2xl font-black text-lg shadow-lg"
            >
              Quero concorrer aos R$ 10.000
            </a>

            <a
              href="/premiacao"
              className="border-2 border-[#0B6E4F] text-[#0B6E4F] px-10 py-5 rounded-2xl font-black bg-white"
            >
              Ver premiação
            </a>
          </div>

          <p className="mt-4 text-sm text-black/50 font-semibold">
            Assinatura única para participar durante toda a competição.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mt-16 md:mt-20">
          <div className="bg-[#0B6E4F] text-white border rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-white/70 font-bold">Premiação</p>

            <p className="text-3xl font-black mt-2 text-[#D4AF37]">
              R$ 10.000
            </p>

            <p className="text-white/70 text-sm mt-2">
              Em prêmios para os melhores colocados.
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-sm text-black/50 font-bold">Assinatura</p>

            <p className="text-3xl font-black mt-2">R$ 49,90</p>

            <p className="text-black/60 text-sm mt-2">
              Acesso ao clube durante toda a Copa.
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-sm text-black/50 font-bold">Ranking</p>

            <p className="text-3xl font-black text-[#0B6E4F] mt-2">
              Ao Vivo
            </p>

            <p className="text-black/60 text-sm mt-2">
              Atualização automática dos pontos.
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-sm text-black/50 font-bold">Palpites</p>

            <p className="text-3xl font-black text-[#D4AF37] mt-2">
  Copa toda
</p>

<p className="text-black/60 text-sm mt-2">
  Palpites da fase de grupos até a grande final.
</p>
          </div>
        </div>

        <div className="mt-20 md:mt-24 bg-[#0B6E4F] rounded-[2rem] p-8 md:p-16 text-white">
          <h2 className="text-4xl md:text-5xl font-black text-center">
            Como funciona?
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl font-black text-[#D4AF37]">01</div>
              <p className="mt-3 font-bold">Entre para o clube</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-black text-[#D4AF37]">02</div>
              <p className="mt-3 font-bold">Faça seus palpites</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-black text-[#D4AF37]">03</div>
              <p className="mt-3 font-bold">Acumule pontos</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-black text-[#D4AF37]">04</div>
              <p className="mt-3 font-bold">Concorra aos prêmios</p>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <h2 className="text-4xl font-black text-center">
            Pontuação simples e transparente
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white border rounded-3xl p-8 text-center">
              <p className="text-6xl font-black text-[#0B6E4F]">10</p>
              <p className="mt-3 text-xl font-black">pontos</p>
              <p className="text-black/60 mt-2">
                Para quem acertar o placar exato do jogo.
              </p>
            </div>

            <div className="bg-white border rounded-3xl p-8 text-center">
              <p className="text-6xl font-black text-[#D4AF37]">3</p>
              <p className="mt-3 text-xl font-black">pontos</p>
              <p className="text-black/60 mt-2">
                Para quem acertar o vencedor ou o empate.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <h2 className="text-4xl font-black text-center">
            O que está incluso na sua assinatura?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white border rounded-3xl p-8">
              <ul className="space-y-5 font-medium">
                <li>✅ Área exclusiva para membros</li>
                <li>✅ Sistema de palpites da Copa do Mundo</li>
                <li>✅ Ranking atualizado em tempo real</li>
                <li>✅ Histórico dos seus palpites</li>
              </ul>
            </div>

            <div className="bg-white border rounded-3xl p-8">
              <ul className="space-y-5 font-medium">
                <li>✅ Participação na disputa de R$ 10.000 em prêmios</li>
                <li>✅ Acompanhamento da Copa 2026</li>
                <li>✅ Pontuação automática após os resultados</li>
                <li>✅ Atualizações durante o torneio</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-24 text-center bg-white border rounded-[2rem] p-8 md:p-14">
          <h2 className="text-4xl md:text-5xl font-black">
            A Copa fica muito mais emocionante quando vale prêmio
          </h2>

          <p className="text-black/60 mt-4 max-w-2xl mx-auto">
            Entre no Clube das Copas, faça seus palpites e acompanhe sua posição
            no ranking até o final da competição.
          </p>

          <a
            href="/cadastro"
            className="inline-block mt-8 bg-[#0B6E4F] text-white px-10 py-4 rounded-2xl font-black"
          >
            Participar agora
          </a>
        </div>
      </section>
    </main>
  );
}