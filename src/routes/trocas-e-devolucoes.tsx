import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Pending } from "@/components/site/Layout";

export const Route = createFileRoute("/trocas-e-devolucoes")({
  head: () => ({
    meta: [
      { title: "Trocas, devoluções e cancelamentos — Morning Shop" },
      { name: "description", content: "Política de trocas, devoluções e cancelamentos da Morning Shop." },
      { property: "og:title", content: "Trocas e devoluções — Morning Shop" },
      { property: "og:description", content: "Política de trocas, devoluções e cancelamentos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell title="Trocas, devoluções e cancelamentos" intro="Texto em elaboração.">
      <h2>Direito de arrependimento</h2>
      <p>Compras feitas pela internet seguem o Código de Defesa do Consumidor (art. 49). <Pending>Procedimento detalhado a definir</Pending></p>
      <h2>Produto com defeito</h2>
      <p><Pending>Prazos e procedimento a definir</Pending></p>
      <h2>Cancelamentos e reembolsos</h2>
      <p><Pending>Forma e prazo de reembolso a definir</Pending></p>
    </PageShell>
  ),
});
