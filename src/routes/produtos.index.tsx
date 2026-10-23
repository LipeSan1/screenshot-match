import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS, type Product } from "@/config/store";
import { ProductCard } from "@/components/site/Product";
import { Input } from "@/components/ui/input";

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
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearchText(query.trim());
  const products = normalizedQuery
    ? PRODUCTS.filter((product) => getSearchText(product).includes(normalizedQuery))
    : PRODUCTS;

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

      {products.length ? (
        <div className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      ) : (
        <p role="status" className="mt-8 rounded-2xl border bg-card p-6 text-muted-foreground">
          Nenhum produto encontrado. Tente buscar por outro nome ou descrição.
        </p>
      )}
    </main>
  );
}

function getSearchText(product: Product) {
  return normalizeSearchText(`${product.name} ${product.fullName} ${product.shortDescription} ${product.description}`);
}

function normalizeSearchText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

