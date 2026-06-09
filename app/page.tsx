export default function Home() {
  return (
    <main className="min-h-screen bg-[#063A2A] text-white overflow-hidden">
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0B6E4F_0%,#063A2A_45%,#031D15_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.18)_0%,transparent_35%,rgba(244,211,94,0.12)_100%)]" />
        <div className="absolute top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D4AF37]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#031D15] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-6 py-16 md:py-24">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#063A2A]/80 shadow-[0_0_60px_rgba(212,175,55,0.25)]">
              <div className="text-center">
                <div className="text-5xl">🏆</div>
                <div className="mt-1 text-[10px] font-black tracking-[0.25em] text-[#D4AF37]">
                  CDC
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 bg-white/10 text-[#F4D35E] border border-[#D4AF37]/30 px-5 py-2 rounded-full font-black text-sm">
              🏆 Campeonato de Palpites da Copa do Mundo 2026
            </span>

            <h1 className="mt-8 text-5xl md:text-8xl font-black leading-[0.95] tracking-tight">
              A Copa começa antes da
              <span className="block text-[#D4AF37]">
                bola rolar.
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-7 text-lg md:text-2xl text-white/80 leading-relaxed">
              Faça seus palpites, acumule pontos, suba no ranking e dispute
              <strong className="text-[#F4D35E]"> R$ 10.000 em premiação</strong>.
            </p>

            <div className="mt-8 inline-flex flex-col md:flex-row items-center justify-center gap-3 bg-[#031D15]/70 border border-[#D4AF37]/25 rounded-3xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.25)]">
              <div className="font-black text-white">
                Placar exato: <span className="text-[#D4AF37]">10 pontos</span>
              </div>

              <div className="hidden md:block text-white/20 font-black">|</div>

              <div className="font-black text-white">
                Vencedor ou empate: <span className="text-[#D4AF37]">3 pontos</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
              <a
                href="/cadastro"
                className="bg-[#0B6E4F] hover:bg-[#0D8A63] transition text-white px-10 py-5 rounded-2xl font-black text-lg shadow-[0_0_35px_rgba(11,110,79,0.45)] border border-white/10"
              >
                Garanta sua vaga
              </a>

              <a
                href="/premiacao"
                className="border-2 border-[#D4AF37] text-white px-10 py-5 rounded-2xl font-black bg-white/5 hover:bg-white/10 transition"
              >
                Ver premiação
              </a>
            </div>

            <p className="mt-5 text-sm text-white/55 font-semibold">
              A Copa é do mundo. A disputa é nossa.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mt-16 md:mt-24">
            <div className="bg-[#063A2A]/90 border border-[#D4AF37]/30 rounded-3xl p-6 shadow-[inset_0_0_40px_rgba(212,175,55,0.06)]">
              <p className="text-sm text-white/60 font-bold">Premiação</p>

              <p className="text-4xl font-black mt-2 text-[#D4AF37]">
                R$ 10.000
              </p>

              <p className="text-white/60 text-sm mt-2">
                Em prêmios para os melhores colocados.
              </p>
            </div>

            <div className="bg-[#063A2A]/90 border border-[#D4AF37]/20 rounded-3xl p-6">
              <p className="text-sm text-white/60 font-bold">Assinatura</p>

              <p className="text-4xl font-black mt-2 text-white">R$ 49,90</p>

              <p className="text-white/60 text-sm mt-2">
                Acesso ao clube durante toda a Copa.
              </p>
            </div>

            <div className="bg-[#063A2A]/90 border border-[#D4AF37]/20 rounded-3xl p-6">
              <p className="text-sm text-white/60 font-bold">Ranking</p>

              <p className="text-4xl font-black text-[#D4AF37] mt-2">
                Ao vivo
              </p>

              <p className="text-white/60 text-sm mt-2">
                Atualização automática dos pontos.
              </p>
            </div>

            <div className="bg-[#063A2A]/90 border border-[#D4AF37]/20 rounded-3xl p-6">
              <p className="text-sm text-white/60 font-bold">Palpites</p>

              <p className="text-4xl font-black text-white mt-2">
                Copa toda
              </p>

              <p className="text-white/60 text-sm mt-2">
                Da fase de grupos até a grande final.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#031D15] px-5 md:px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#063A2A] border border-[#D4AF37]/25 rounded-[2rem] p-8 md:p-16 text-white shadow-[0_0_60px_rgba(0,0,0,0.25)]">
            <h2 className="text-4xl md:text-6xl font-black text-center">
              Como funciona?
            </h2>

            <div className="grid md:grid-cols-4 gap-8 mt-12">
              {[
                ["01", "Entre para o clube"],
                ["02", "Faça seus palpites"],
                ["03", "Suba no ranking"],
                ["04", "Dispute a taça"],
              ].map((item) => (
                <div key={item[0]} className="text-center">
                  <div className="text-5xl font-black text-[#D4AF37]">
                    {item[0]}
                  </div>

                  <p className="mt-3 font-bold text-white/90">
                    {item[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 md:mt-24">
            <h2 className="text-4xl md:text-6xl font-black text-center">
              Pontuação simples e transparente
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-[#063A2A] border border-[#D4AF37]/25 rounded-3xl p-8 text-center">
                <p className="text-7xl font-black text-[#D4AF37]">10</p>
                <p className="mt-3 text-xl font-black">pontos</p>
                <p className="text-white/60 mt-2">
                  Para quem acertar o placar exato do jogo.
                </p>
              </div>

              <div className="bg-[#063A2A] border border-[#D4AF37]/25 rounded-3xl p-8 text-center">
                <p className="text-7xl font-black text-[#D4AF37]">3</p>
                <p className="mt-3 text-xl font-black">pontos</p>
                <p className="text-white/60 mt-2">
                  Para quem acertar o vencedor ou o empate.
                </p>
              </div>
            </div>
          </div>


<div className="mt-20 md:mt-24 bg-[#063A2A] border border-[#D4AF37]/25 rounded-[2rem] p-8 md:p-14">
  <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
    <div>
      <p className="text-[#D4AF37] font-black tracking-[0.25em] text-sm">
        LIGAS PRIVADAS
      </p>

      <h2 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
        Crie uma disputa só com seus amigos.
      </h2>

      <p className="text-white/65 mt-5 text-lg leading-relaxed">
        Além de participar do Ranking Geral do Clube das Copas, você também pode
        criar uma liga privada para competir com amigos, família, colegas de
        trabalho ou aquele grupo que vive falando que entende de futebol.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="bg-[#031D15]/70 border border-[#D4AF37]/20 rounded-3xl p-5">
          <p className="text-3xl">🏆</p>
          <p className="font-black mt-3">
            Ranking exclusivo
          </p>
          <p className="text-white/55 text-sm mt-2">
            Veja quem está mandando melhor dentro da sua própria liga.
          </p>
        </div>

        <div className="bg-[#031D15]/70 border border-[#D4AF37]/20 rounded-3xl p-5">
          <p className="text-3xl">👥</p>
          <p className="font-black mt-3">
            Convite por código
          </p>
          <p className="text-white/55 text-sm mt-2">
            Compartilhe o código e aprove quem pode entrar na disputa.
          </p>
        </div>
      </div>

      <a
        href="/ligas"
        className="inline-block mt-8 bg-[#0B6E4F] hover:bg-[#0D8A63] transition text-white px-10 py-4 rounded-2xl font-black border border-white/10"
      >
        Criar minha liga
      </a>
    </div>

    <div className="bg-[#031D15]/80 border border-[#D4AF37]/25 rounded-[2rem] p-6 shadow-[inset_0_0_50px_rgba(212,175,55,0.06)]">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-sm text-white/50 font-bold">
            Liga exemplo
          </p>
          <p className="font-black text-2xl text-[#D4AF37]">
            Amigos da Copa
          </p>
        </div>

        <span className="text-4xl">🏆</span>
      </div>

      <div className="mt-5 space-y-4">
        {[
          ["#1", "Neymar", "34 pts"],
          ["#2", "ViniJr", "31 pts"],
          ["#3", "Brasil2026", "27 pts"],
        ].map((item) => (
          <div
            key={item[0]}
            className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-black text-[#D4AF37]">
                {item[0]}
              </span>

              <span className="font-bold">
                {item[1]}
              </span>
            </div>

            <span className="font-black text-white/70">
              {item[2]}
            </span>
          </div>
        ))}
      </div>

      <p className="text-white/45 text-sm mt-5 text-center">
        A disputa geral é por R$ 10.000. A rivalidade com os amigos é por orgulho.
      </p>
    </div>
  </div>
</div>
          <div className="mt-20 md:mt-24">
            <h2 className="text-4xl md:text-6xl font-black text-center">
              O que está incluso?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-[#063A2A] border border-[#D4AF37]/25 rounded-3xl p-8">
                <ul className="space-y-5 font-medium text-white/85">
                  <li>✅ Área exclusiva para membros</li>
                  <li>✅ Sistema de palpites da Copa do Mundo</li>
                  <li>✅ Ranking atualizado em tempo real</li>
                  <li>✅ Histórico dos seus palpites</li>
                </ul>
              </div>

              <div className="bg-[#063A2A] border border-[#D4AF37]/25 rounded-3xl p-8">
                <ul className="space-y-5 font-medium text-white/85">
                  <li>✅ Disputa de R$ 10.000 em premiação</li>
                  <li>✅ Palpites da fase de grupos até a final</li>
                  <li>✅ Pontuação automática após os resultados</li>
                  <li>✅ Critérios de desempate transparentes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-24 text-center bg-[#063A2A] border border-[#D4AF37]/30 rounded-[2rem] p-8 md:p-14 shadow-[inset_0_0_50px_rgba(212,175,55,0.07)]">
            <p className="text-[#D4AF37] font-black tracking-[0.25em] text-sm">
              CLUBE DAS COPAS
            </p>

            <h2 className="mt-4 text-4xl md:text-6xl font-black">
              Mostre que você entende de Copa.
            </h2>

            <p className="text-white/65 mt-4 max-w-2xl mx-auto">
              Entre na competição, acompanhe sua posição no ranking e viva a Copa
              do Mundo como protagonista.
            </p>

            <a
              href="/cadastro"
              className="inline-block mt-8 bg-[#0B6E4F] hover:bg-[#0D8A63] transition text-white px-10 py-4 rounded-2xl font-black border border-white/10"
            >
              Participar agora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}