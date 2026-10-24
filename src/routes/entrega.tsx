import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Layout";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/entrega")({
  head: () => ({
    meta: [
      { title: "Informações de entrega — Morning Shop" },
      { name: "description", content: "Prazos, frete e acompanhamento de pedidos da Morning Shop." },
      { property: "og:title", content: "Informações de entrega — Morning Shop" },
      { property: "og:description", content: "Prazos, frete e acompanhamento de pedidos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell title="Informações de entrega">
      <h2>Prazo</h2>
      <p>{STORE.deliveryInfo} O prazo começa a contar após a aprovação do pagamento (Pix e cartão costumam ser aprovados na hora; boleto em até 3 dias úteis).</p>
      <h2>Frete</h2>
      <p>Entregamos para todo o Brasil. O valor do frete é exibido no checkout antes da confirmação do pagamento.</p>
      <h2>Rastreamento</h2>
      <p>Assim que o pedido for enviado, você recebe o código de rastreio por e-mail ou WhatsApp para acompanhar a entrega.</p>
      <h2>Ausência ou endereço incorreto</h2>
      <p>Confira o endereço com atenção no checkout. Se a entrega não for concluída por ausência ou endereço incorreto e o pedido retornar, entraremos em contato para combinar um novo envio.</p>
      <h2>Dúvidas</h2>
      <p>Fale conosco pelo WhatsApp ou pelo e-mail {STORE.email}. Atendimento: {STORE.supportHours}.</p>
    </PageShell>
  ),
});
