export default function Termos() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-8">
        Termos de Uso
      </h1>

      <div className="space-y-6 text-black/80">
        <p>
          O Clube das Copas é uma plataforma de entretenimento baseada em
          palpites esportivos relacionados à Copa do Mundo FIFA 2026.
        </p>

        <p>
          A participação ocorre mediante assinatura e dá acesso às áreas
          exclusivas do sistema durante a competição.
        </p>

        <p>
          Os participantes acumulam pontos conforme os critérios divulgados:
        </p>

        <ul className="list-disc ml-6">
          <li>10 pontos para placar exato.</li>
          <li>3 pontos para acertar vencedor ou empate.</li>
          <li>0 pontos para os demais casos.</li>
        </ul>

        <p>
          Os palpites são bloqueados 30 minutos antes do início de cada partida.
        </p>

        <p>
          A classificação é calculada automaticamente pela plataforma.
        </p>

        <p>
          Em caso de empate na pontuação final, serão aplicados os seguintes
critérios de desempate:

1. Maior número de placares exatos.
2. Maior número de acertos de vencedor ou empate.
3. Data de cadastro mais antiga.
4. Sorteio realizado pela organização.
        </p>

        <p>
          A organização reserva-se o direito de corrigir erros operacionais,
          inconsistências técnicas ou informações cadastradas incorretamente.
        </p>

        <p>
          Ao utilizar a plataforma, o participante declara estar de acordo com
          estes termos.
        </p>
      </div>
    </main>
  );
}