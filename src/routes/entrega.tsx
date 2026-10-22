import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Pending } from "@/components/site/Layout";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/entrega")({
  head: () => ({
    meta: [
      { title: "Informações de entrega — Morning Shop" },
      { name: "description", content: "Prazos, frete e acompanhamento de pedidos da Morning Shop." },
      { property: "og:title", content: "Informações de entrega — Morning Shop" },
      { property: "og:description", content: "Prazos, frete e acompanhamento de pedidos." },
    ],
  }),
  component: () => (
    <PageShell title="Informações de entrega">
      <h2>Prazo</h2>
      <p>{STORE.deliveryInfo || <Pending>Prazo de entrega a definir</Pending>}</p>
      <h2>Frete</h2>
      <p>O valor do frete é exibido no checkout antes da confirmação do pagamento. <Pending>Regiões atendidas a definir</Pending></p>
      <h2>Rastreamento</h2>
      <p><Pending>Forma de envio do código de rastreio a definir</Pending></p>
    </PageShell>
  ),
});
