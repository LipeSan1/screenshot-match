import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Pending } from "@/components/site/Layout";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Morning Shop" },
      { name: "description", content: "Conheça a Morning Shop." },
      { property: "og:title", content: "Sobre — Morning Shop" },
      { property: "og:description", content: "Conheça a Morning Shop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell title="Sobre a Morning Shop">
      <p>A Morning Shop é uma loja virtual que seleciona produtos práticos para deixar sua casa mais bonita e iluminada.</p>
      <p><Pending>Texto institucional a definir: história, CNPJ, endereço e missão da marca.</Pending></p>
    </PageShell>
  ),
});
