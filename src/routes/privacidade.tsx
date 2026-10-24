import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Layout";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade — Morning Shop" },
      { name: "description", content: "Como a Morning Shop trata seus dados." },
      { property: "og:title", content: "Política de privacidade — Morning Shop" },
      { property: "og:description", content: "Como a Morning Shop trata seus dados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell title="Política de privacidade" intro="Esta política explica como tratamos seus dados pessoais, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).">
      <h2>Responsável pelos dados</h2>
      <p>{STORE.name}, CNPJ {STORE.cnpj}, com sede em {STORE.address}. Contato para assuntos de privacidade: {STORE.email}.</p>
      <h2>Dados coletados</h2>
      <p>Este site não possui cadastro nem armazena dados de cartão. Ao finalizar a compra, nome, CPF, endereço, telefone e e-mail são informados no ambiente seguro do checkout do nosso parceiro de pagamentos, que processa o pagamento com criptografia.</p>
      <h2>Para que usamos</h2>
      <p>Usamos esses dados apenas para processar e entregar o pedido, emitir nota fiscal, enviar o rastreio e prestar atendimento. Não vendemos nem compartilhamos seus dados para outras finalidades; eles são repassados só a parceiros necessários, como o de pagamento e a transportadora.</p>
      <h2>Contato pelo WhatsApp e e-mail</h2>
      <p>Mensagens que você nos envia são usadas apenas para responder ao seu atendimento.</p>
      <h2>Cookies</h2>
      <p>O site pode usar cookies essenciais para funcionar corretamente. Caso passemos a usar ferramentas de análise ou anúncios, esta política será atualizada.</p>
      <h2>Seus direitos</h2>
      <p>Você pode pedir acesso, correção ou exclusão dos seus dados, ou tirar dúvidas, pelo e-mail {STORE.email}. Responderemos em até 15 dias.</p>
    </PageShell>
  ),
});
