export default function Premiacao() {
  const premios = [
    { posicao: "1º Lugar", premio: "R$ 5.000", emoji: "🥇" },
    { posicao: "2º Lugar", premio: "R$ 2.500", emoji: "🥈" },
    { posicao: "3º Lugar", premio: "R$ 1.500", emoji: "🥉" },
    { posicao: "4º Lugar", premio: "R$ 600", emoji: "🏅" },
    { posicao: "5º Lugar", premio: "R$ 400", emoji: "🏅" },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#111111] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-5xl font-black mt-4">
          Premiação da competição
        </h1>

        <p className="text-black/60 mt-4 text-lg">
          Os melhores colocados no ranking geral recebem premiações ao final da Copa.
        </p>

        <div className="grid md:grid-cols-5 gap-4 mt-10">
          {premios.map((item) => (
            <div
              key={item.posicao}
              className="bg-white border rounded-3xl p-6 text-center"
            >
              <div className="text-4xl">{item.emoji}</div>
              <p className="font-black mt-3">{item.posicao}</p>
              <p className="text-[#0B6E4F] text-2xl font-black mt-2">
                {item.premio}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#0B6E4F] text-white rounded-3xl p-8">
          <h2 className="text-3xl font-black">Como ganhar pontos?</h2>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-2xl p-5">
              <p className="text-3xl font-black text-[#D4AF37]">10 pts</p>
              <p className="mt-2 font-bold">Acertar o placar exato</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5">
              <p className="text-3xl font-black text-[#D4AF37]">5 pts</p>
              <p className="mt-2 font-bold">Acertar vencedor ou empate</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5">
              <p className="text-3xl font-black text-[#D4AF37]">0 pts</p>
              <p className="mt-2 font-bold">Errar o resultado</p>
            </div>
          </div>
        </div>

        <a
          href="/cadastro"
          className="block text-center mt-10 bg-[#0B6E4F] text-white rounded-2xl py-4 font-black"
        >
          Participar por R$ 49,90
        </a>
      </div>
    </main>
  );
}