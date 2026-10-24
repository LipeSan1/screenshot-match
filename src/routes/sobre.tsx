import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Layout";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Morning Shop" },
      { name: "description", content: "Conheça a Morning Shop, loja virtual de Guarulhos - SP." },
      { property: "og:title", content: "Sobre — Morning Shop" },
      { property: "og:description", content: "Conheça a Morning Shop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell title="Sobre a Morning Shop">
      <p>A Morning Shop é uma loja virtual de Guarulhos - SP que escolhe produtos práticos e úteis para o dia a dia, para a sua casa e para o seu bem-estar.</p>
      <p>Nosso compromisso é oferecer informações claras sobre cada produto, pagamento seguro, envio com rastreamento e um atendimento próximo e humano, do pedido até a entrega.</p>
      <h2>Dados da empresa</h2>
      <p>{STORE.name} · CNPJ {STORE.cnpj}<br />{STORE.address}<br />Atendimento: {STORE.supportHours}</p>
    </PageShell>
  ),
});
