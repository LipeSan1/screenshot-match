import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS, type Product } from "@/config/store";
import { ProductCard } from "@/components/site/Product";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/produtos/")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Produtos — Morning Shop" },
      { name: "description", content: "Catálogo de produtos da Morning Shop." },
      { property: "og:title", content: "Produtos — Morning Shop" },
      { property: "og:description", content: "Catálogo de produtos da Morning Shop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q);
  const [activeCategory, setActiveCategory] = useState("Todas");
  useEffect(() => setQuery(q), [q]);
  const categories = [...new Set(PRODUCTS.map((product) => product.category))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const normalizedQuery = normalizeSearchText(query.trim());
  const products = PRODUCTS.filter((product) =>
    (activeCategory === "Todas" || product.category === activeCategory) &&
    (!normalizedQuery || getSearchText(product).includes(normalizedQuery)),
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl">Produtos</h1>
          <p id="catalog-result-count" className="mt-2 text-sm text-muted-foreground" aria-live="polite">
            {products.length} {products.length === 1 ? "produto" : "produtos"}
          </p>
        </div>
        <div className="w-full sm:max-w-sm">
          <label htmlFor="catalog-search" className="mb-2 block text-sm font-medium text-foreground">
            Buscar produtos
          </label>
          <Input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nome ou descrição"
            aria-describedby="catalog-result-count"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border bg-card p-4" aria-label="Categorias de produtos">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">Categorias</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
            {["Todas", ...categories].map((category) => {
              const count = category === "Todas" ? PRODUCTS.length : PRODUCTS.filter((product) => product.category === category).length;
              const selected = category === activeCategory;
              return <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={selected}
                className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors md:w-full ${selected ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                <span>{category}</span><span className="text-xs">{count}</span>
              </button>;
            })}
          </div>
        </aside>

        {products.length ? (
          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        ) : (
          <p role="status" className="rounded-2xl border bg-card p-6 text-muted-foreground">
            Nenhum produto encontrado. Tente buscar por outro nome ou descrição.
          </p>
        )}
      </div>
    </main>
  );
}

function getSearchText(product: Product) {
  return normalizeSearchText(`${product.name} ${product.fullName} ${product.shortDescription} ${product.description}`);
}

function normalizeSearchText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

