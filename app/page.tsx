export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#111111]">
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center max-w-5xl mx-auto">

          <span className="inline-flex items-center gap-2 bg-[#D4AF37]/15 text-[#0B6E4F] border border-[#D4AF37]/30 px-5 py-2 rounded-full font-black text-sm">
            🏆 Clube Oficial da Copa do Mundo 2026
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">
            Viva a Copa do Mundo
            <br />
            de um jeito que você
            <span className="text-[#0B6E4F]"> nunca viveu</span>
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-xl text-black/70 leading-relaxed">
            Faça parte do Clube das Copas e acompanhe a Copa do Mundo 2026
            em uma área exclusiva para membros, com sistema de palpites,
            ranking em tempo real, acompanhamento da competição e benefícios exclusivos.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-12">

            <a
              href="/cadastro"
              className="bg-[#0B6E4F] hover:opacity-90 transition text-white px-10 py-5 rounded-2xl font-black text-lg"
            >
              Entrar para o Clube
            </a>

            <a
              href="/premiacao"
              className="border-2 border-[#0B6E4F] text-[#0B6E4F] px-10 py-5 rounded-2xl font-black"
            >
              Conhecer os Benefícios
            </a>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-5 mt-20">

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-sm text-black/50 font-bold">
              Assinatura
            </p>

            <p className="text-3xl font-black mt-2">
              R$ 49,90
            </p>

            <p className="text-black/60 text-sm mt-2">
              Acesso ao clube durante toda a Copa.
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-sm text-black/50 font-bold">
              Ranking
            </p>

            <p className="text-3xl font-black text-[#0B6E4F] mt-2">
              Ao Vivo
            </p>

            <p className="text-black/60 text-sm mt-2">
              Atualização automática dos pontos.
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-sm text-black/50 font-bold">
              Palpites
            </p>

            <p className="text-3xl font-black text-[#D4AF37] mt-2">
              Todos
            </p>

            <p className="text-black/60 text-sm mt-2">
              Palpite em todos os jogos da Copa.
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-sm text-black/50 font-bold">
              Benefícios
            </p>

            <p className="text-3xl font-black text-[#0B6E4F] mt-2">
              Exclusivos
            </p>

            <p className="text-black/60 text-sm mt-2">
              Conteúdo e experiências para membros.
            </p>
          </div>

        </div>

        <div className="mt-24">

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
                <li>✅ Acompanhamento da Copa 2026</li>
                <li>✅ Benefícios exclusivos para membros</li>
                <li>✅ Participação nas premiações do clube</li>
                <li>✅ Novidades e atualizações durante o torneio</li>
              </ul>
            </div>

          </div>

        </div>

        <div className="mt-24 bg-[#0B6E4F] rounded-[2rem] p-10 md:p-16 text-white">

          <h2 className="text-4xl md:text-5xl font-black text-center">
            Como funciona?
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-12">

            <div className="text-center">
              <div className="text-5xl font-black text-[#D4AF37]">
                01
              </div>

              <p className="mt-3 font-bold">
                Entre para o clube
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-black text-[#D4AF37]">
                02
              </div>

              <p className="mt-3 font-bold">
                Acompanhe a Copa
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-black text-[#D4AF37]">
                03
              </div>

              <p className="mt-3 font-bold">
                Faça seus palpites
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-black text-[#D4AF37]">
                04
              </div>

              <p className="mt-3 font-bold">
                Suba no ranking
              </p>
            </div>

          </div>

        </div>

        <div className="mt-24 text-center">

          <h2 className="text-4xl md:text-5xl font-black">
            Benefícios para os melhores colocados
          </h2>

          <p className="text-black/60 mt-4">
            Os participantes mais bem posicionados no ranking geral recebem benefícios e premiações ao final da competição.
          </p>

          <a
            href="/premiacao"
            className="inline-block mt-8 bg-[#0B6E4F] text-white px-10 py-4 rounded-2xl font-black"
          >
            Ver premiação completa
          </a>

        </div>

      </section>
    </main>
  );
}