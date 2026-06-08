export default function Politica() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-8">
        Política de Privacidade
      </h1>

      <div className="space-y-6 text-black/80">
        <p>
          O Clube das Copas coleta apenas as informações necessárias para
          identificação dos participantes e funcionamento da plataforma.
        </p>

        <p>
          Os dados coletados podem incluir:
        </p>

        <ul className="list-disc ml-6">
          <li>Nome</li>
          <li>CPF</li>
          <li>E-mail</li>
          <li>WhatsApp</li>
          <li>Data de nascimento</li>
        </ul>

        <p>
          Os dados são utilizados exclusivamente para:
        </p>

        <ul className="list-disc ml-6">
          <li>Autenticação de acesso</li>
          <li>Controle de assinaturas</li>
          <li>Comunicação com participantes</li>
          <li>Entrega de premiações</li>
        </ul>

        <p>
          O Clube das Copas não comercializa informações pessoais de seus
          participantes.
        </p>

        <p>
          Os dados são armazenados em ambiente seguro e utilizados apenas para
          fins operacionais relacionados à plataforma.
        </p>
      </div>
    </main>
  );
}