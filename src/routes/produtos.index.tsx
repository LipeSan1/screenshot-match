import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/config/store";
import { ProductCard } from "@/components/site/Product";

export const Route = createFileRoute("/produtos/")({
  head: () => ({
    meta: [
      { title: "Produtos — Morning Shop" },
      { name: "description", content: "Catálogo de produtos da Morning Shop." },
      { property: "og:title", content: "Produtos — Morning Shop" },
      { property: "og:description", content: "Catálogo de produtos da Morning Shop." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl md:text-4xl">Produtos</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </main>
  );
}
