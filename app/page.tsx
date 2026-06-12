export default function Home() {
  return (
    <main className="min-h-screen bg-[#031D15] text-white overflow-hidden">
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0B6E4F_0%,#063A2A_45%,#031D15_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.22)_0%,transparent_35%,rgba(244,211,94,0.14)_100%)]" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-6 py-14 md:py-24">
          <div className="text-center max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/10 text-[#F4D35E] border border-[#D4AF37]/30 px-5 py-2 rounded-full font-black text-sm">
              🏆 Bolão da Copa do Mundo 2026
            </span>

            <h1 className="mt-7 text-5xl md:text-8xl font-black leading-[0.95] tracking-tight">
              A COPA JÁ
              <span className="block text-[#D4AF37]">COMEÇOU.</span>
              AINDA DÁ TEMPO.
            </h1>

            <p className="max-w-3xl mx-auto mt-7 text-lg md:text-2xl text-white/80 leading-relaxed">
              Ainda restam dezenas de jogos, milhares de pontos em disputa e
              <strong className="text-[#F4D35E]">
                {" "}
                R$ 10.000 em premiações.
              </strong>
            </p>

            <div className="mt-6 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-3xl p-5 max-w-3xl mx-auto">
              <p className="font-black text-[#F4D35E] text-lg">
                ⚽ Você não perdeu a chance.
              </p>

              <p className="text-white/80 mt-2">
                A competição está apenas começando. Ainda dá tempo de subir no
                ranking, criar sua liga privada e disputar os R$5.000 para o
                campeão.
              </p>
            </div>

            <p className="mt-5 text-lg md:text-xl font-black text-[#D4AF37]">
              🥇 1º Lugar: R$ 5.000 • Entrada única: R$ 49,90
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              <div className="bg-[#D4AF37] text-black rounded-3xl p-5">
                <p className="text-sm font-bold">🥇 1º Lugar</p>
                <p className="text-3xl font-black">R$ 5.000</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-5">
                <p className="text-sm font-bold text-white/70">🥈 2º Lugar</p>
                <p className="text-3xl font-black">R$ 2.500</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-5">
                <p className="text-sm font-bold text-white/70">🥉 3º Lugar</p>
                <p className="text-3xl font-black">R$ 1.500</p>
              </div>

              <div className="bg-[#0B6E4F] border border-white/10 rounded-3xl p-5">
                <p className="text-sm font-bold text-white/70">🎟️ Entrada</p>
                <p className="text-3xl font-black">R$ 49,90</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-[#0B6E4F]/30 border border-[#0B6E4F] p-5 max-w-3xl mx-auto">
              <p className="text-xl font-black">
                🔥 Ainda há tempo para alcançar o topo.
              </p>

              <p className="text-white/75 mt-2">
                A Copa do Mundo possui dezenas de partidas pela frente. Cada
                rodada é uma nova oportunidade de somar pontos.
              </p>
            </div>

            <div className="mt-8 rounded-3xl bg-[#031D15]/70 border border-[#D4AF37]/25 p-4">
              <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                <div className="font-black text-white">
                  Placar exato:{" "}
                  <span className="text-[#D4AF37]">10 pontos</span>
                </div>

                <div className="hidden md:block text-white/20 font-black">|</div>

                <div className="font-black text-white">
                  Vencedor ou empate:{" "}
                  <span className="text-[#D4AF37]">3 pontos</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
              <a
                href="/cadastro"
                className="bg-[#D4AF37] hover:bg-[#F4D35E] transition text-black px-10 py-5 rounded-2xl font-black text-lg shadow-[0_0_35px_rgba(212,175,55,0.35)] border border-white/10"
              >
                ENTRAR NA DISPUTA AGORA
              </a>

              <a
                href="/premiacao"
                className="border-2 border-[#D4AF37] text-white px-10 py-5 rounded-2xl font-black bg-white/5 hover:bg-white/10 transition"
              >
                Ver premiação completa
              </a>
            </div>

            <p className="mt-5 text-sm text-[#D4AF37] font-black">
              🏆 R$ 10.000 em premiações • Pagamento único de R$ 49,90
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#031D15] px-5 md:px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#063A2A] border border-[#D4AF37]/25 rounded-[2rem] p-8 md:p-16 text-white">
            <p className="text-center text-[#D4AF37] font-black tracking-[0.25em] text-sm">
              POR QUE PARTICIPAR?
            </p>

            <h2 className="mt-4 text-4xl md:text-6xl font-black text-center">
              Seu palpite ainda pode valer R$ 5.000.
            </h2>

            <div className="grid md:grid-cols-5 gap-5 mt-12">
              {[
                ["🏆", "R$10.000 em prêmios"],
                ["⚽", "Todos os jogos valem pontos"],
                ["📊", "Ranking em tempo real"],
                ["👥", "Ligas privadas com amigos"],
                ["⏳", "Ainda dá tempo de entrar"],
              ].map((item) => (
                <div
                  key={item[1]}
                  className="bg-[#031D15]/70 border border-[#D4AF37]/20 rounded-3xl p-5 text-center"
                >
                  <p className="text-4xl">{item[0]}</p>
                  <p className="font-black mt-3">{item[1]}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="/cadastro"
                className="inline-block bg-[#D4AF37] hover:bg-[#F4D35E] transition text-black px-10 py-4 rounded-2xl font-black"
              >
                PARTICIPAR AGORA
              </a>
            </div>
          </div>

          <div className="mt-20 md:mt-24">
            <h2 className="text-4xl md:text-6xl font-black text-center">
              Como funciona?
            </h2>

            <div className="grid md:grid-cols-4 gap-8 mt-12">
              {[
                ["01", "Crie sua conta"],
                ["02", "Pague apenas R$49,90"],
                ["03", "Faça seus palpites"],
                ["04", "Suba no ranking"],
              ].map((item) => (
                <div
                  key={item[0]}
                  className="bg-[#063A2A] border border-[#D4AF37]/20 rounded-3xl p-8 text-center"
                >
                  <div className="text-5xl font-black text-[#D4AF37]">
                    {item[0]}
                  </div>

                  <p className="mt-3 font-bold text-white/90">{item[1]}</p>
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
                  Além de participar do ranking geral, você pode criar uma liga
                  privada para competir com amigos, família ou colegas de
                  trabalho.
                </p>

                <a
                  href="/cadastro"
                  className="inline-block mt-8 bg-[#0B6E4F] hover:bg-[#0D8A63] transition text-white px-10 py-4 rounded-2xl font-black border border-white/10"
                >
                  Criar minha liga
                </a>
              </div>

              <div className="bg-[#031D15]/80 border border-[#D4AF37]/25 rounded-[2rem] p-6">
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

                        <span className="font-bold">{item[1]}</span>
                      </div>

                      <span className="font-black text-white/70">
                        {item[2]}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-white/45 text-sm mt-5 text-center">
                  A disputa geral é por R$ 10.000. A rivalidade com os amigos é
                  por orgulho.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-24">
            <h2 className="text-4xl md:text-6xl font-black text-center">
              Perguntas frequentes
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {[
                [
                  "Quanto custa participar?",
                  "A entrada é única, no valor de R$49,90.",
                ],
                [
                  "Já começou. Ainda vale a pena entrar?",
                  "Sim. Ainda restam dezenas de jogos e muitos pontos em disputa.",
                ],
                [
                  "Posso alterar meus palpites?",
                  "Sim, até 30 minutos antes do início de cada jogo.",
                ],
                [
                  "Como funciona a pontuação?",
                  "Placar exato vale 10 pontos. Acertar vencedor ou empate vale 3 pontos.",
                ],
              ].map((faq) => (
                <div
                  key={faq[0]}
                  className="bg-[#063A2A] border border-[#D4AF37]/25 rounded-3xl p-7"
                >
                  <h3 className="text-xl font-black text-[#D4AF37]">
                    {faq[0]}
                  </h3>

                  <p className="text-white/70 mt-3">{faq[1]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 md:mt-24 text-center bg-[#063A2A] border border-[#D4AF37]/30 rounded-[2rem] p-8 md:p-14">
            <p className="text-[#D4AF37] font-black tracking-[0.25em] text-sm">
              CLUBE DAS COPAS
            </p>

            <h2 className="mt-4 text-4xl md:text-6xl font-black">
              Ainda dá tempo de entrar na disputa.
            </h2>

            <p className="text-white/65 mt-4 max-w-2xl mx-auto">
              A Copa já começou, mas o ranking ainda tem muitos pontos em jogo.
              Entre agora e dispute R$10.000 em premiações.
            </p>

            <a
              href="/cadastro"
              className="inline-block mt-8 bg-[#D4AF37] hover:bg-[#F4D35E] transition text-black px-10 py-4 rounded-2xl font-black border border-white/10"
            >
              ENTRAR NA DISPUTA AGORA
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}