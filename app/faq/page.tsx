export default function FAQ() {
  const perguntas = [
    {
      pergunta: "Quanto custa participar?",
      resposta:
        "A participação no Clube das Copas custa R$ 49,90 e garante acesso durante toda a competição.",
    },
    {
      pergunta: "Como funciona a pontuação?",
      resposta:
        "Placar exato vale 10 pontos. Acertar apenas o vencedor ou empate vale 3 pontos.",
    },
    {
      pergunta: "Até quando posso fazer meus palpites?",
      resposta:
        "Os palpites ficam disponíveis até 30 minutos antes do início de cada partida.",
    },
    {
      pergunta: "Como acompanho minha posição?",
      resposta:
        "Você pode acompanhar sua colocação em tempo real na página de Ranking.",
    },
    {
      pergunta: "Como recebo a premiação?",
      resposta:
        "Os vencedores serão contatados pela organização após o encerramento da competição para validação e entrega dos prêmios.",
    },
    {
      pergunta: "O que acontece em caso de empate no ranking?",
      resposta:
        "O desempate segue os critérios: maior número de placares exatos, maior número de acertos de vencedor/empate, ordem alfabética e, se necessário, sorteio da organização.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF7] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#0B6E4F] font-black text-sm">
          CLUBE DAS COPAS 2026
        </p>

        <h1 className="text-4xl font-black mt-3">
          Perguntas Frequentes
        </h1>

        <p className="text-black/60 mt-2">
          Tire suas principais dúvidas sobre o Clube das Copas.
        </p>

        <div className="mt-10 space-y-4">
          {perguntas.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-3xl p-6"
            >
              <h2 className="font-black text-lg">
                {item.pergunta}
              </h2>

              <p className="text-black/70 mt-3">
                {item.resposta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}