import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { STORE, getProduct } from "@/config/store";
import { Pending, btn } from "@/components/site/Layout";
import { BuyActions, FaqList, Gallery, Price } from "@/components/site/Product";

export const Route = createFileRoute("/produtos/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Produto não encontrado — Morning Shop" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.name} — Morning Shop` },
        { name: "description", content: p.shortDescription },
        { property: "og:title", content: `${p.name} — Morning Shop` },
        { property: "og:description", content: p.shortDescription },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl">Produto não encontrado</h1>
      <p className="mt-3 text-muted-foreground">Este produto não existe ou não está mais disponível.</p>
      <Link to="/produtos" className={btn("primary", "mt-6 h-12 px-7")}>Ver produtos</Link>
    </main>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const delivery = p.deliveryInfo || STORE.deliveryInfo;
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <nav aria-label="Trilha" className="mb-6 text-sm text-muted-foreground">
        <Link to="/produtos" className="hover:text-primary">Produtos</Link> / <span>{p.name}</span>
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <Gallery product={p} />
        <div>
          <h1 className="text-3xl md:text-4xl">{p.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{p.fullName}</p>
          <div className="mt-6"><Price product={p} /></div>
          <div className="mt-6"><BuyActions product={p} /></div>
          <div className="mt-6 rounded-xl border bg-card p-4 text-sm">
            <h2 className="font-display text-base">Entrega</h2>
            <p className="mt-1 text-muted-foreground">{delivery || <Pending>Frete e prazo a definir</Pending>}</p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {p.availability === "available"
              ? "Preço, frete e condições finais são exibidos no checkout antes da confirmação do pagamento. "
              : "Este produto ainda está em cadastro. Preço, fotos, disponibilidade e condições de entrega serão confirmados antes da liberação da compra. "}
            Veja nossa{" "}
            <Link to="/trocas-e-devolucoes" className="text-primary hover:underline">política de trocas</Link>.
          </p>
        </div>
      </div>

      <section className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl">Descrição</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{p.description}</p>
          {p.highlights.length > 0 && <>
            <h3 className="mt-8 text-lg">Destaques</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </>}
          {p.included.length > 0 && <>
            <h3 className="mt-8 text-lg">Itens inclusos</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">{p.included.map((h) => <li key={h}>{h}</li>)}</ul>
          </>}
        </div>
        {p.specs.length > 0 && <div>
          <h2 className="text-2xl">Ficha técnica</h2>
          <dl className="mt-4 divide-y rounded-2xl border bg-card">
            {p.specs.map((s) => <div key={s.label} className="grid grid-cols-3 gap-3 p-4 text-sm"><dt className="font-semibold text-ice">{s.label}</dt><dd className="col-span-2 text-muted-foreground">{s.value}</dd></div>)}
          </dl>
        </div>}
      </section>

      {p.faq.length > 0 && <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl">Dúvidas sobre o produto</h2>
        <div className="mt-6"><FaqList items={p.faq} /></div>
      </section>}
    </main>
  );
}

