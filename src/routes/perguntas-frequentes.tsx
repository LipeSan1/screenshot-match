import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Layout";
import { FaqList } from "@/components/site/Product";
import { GENERAL_FAQ } from "@/config/faq";
import { PRODUCTS } from "@/config/store";

export const Route = createFileRoute("/perguntas-frequentes")({
  head: () => ({
    meta: [
      { title: "Perguntas frequentes — Morning Shop" },
      { name: "description", content: "Respostas para as dúvidas mais comuns sobre compras na Morning Shop." },
      { property: "og:title", content: "Perguntas frequentes — Morning Shop" },
      { property: "og:description", content: "Dúvidas comuns sobre compras na Morning Shop." },
    ],
  }),
  component: () => (
    <PageShell title="Perguntas frequentes">
      <h2>Compras</h2>
      <FaqList items={GENERAL_FAQ} />
      {PRODUCTS.map((p) => (
        <div key={p.slug}>
          <h2>{p.name}</h2>
          <div className="mt-4"><FaqList items={p.faq} /></div>
        </div>
      ))}
    </PageShell>
  ),
});
