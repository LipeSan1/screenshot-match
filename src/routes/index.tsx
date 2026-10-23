import { createFileRoute, Link } from "@tanstack/react-router";
import emblema from "@/assets/morning-shop-emblema.png.asset.json";
import { PRODUCTS, resolveCheckoutUrl } from "@/config/store";
import { GENERAL_FAQ } from "@/config/faq";
import { btn } from "@/components/site/Layout";
import { FaqList, Price, ProductImage } from "@/components/site/Product";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Morning Shop — Projetor Natalino LED e mais" },
      { name: "description", content: "Morning Shop: decoração e novidades com entrega para todo o Brasil. Conheça o Projetor Natalino LED." },
      { property: "og:title", content: "Morning Shop — Projetor Natalino LED e mais" },
      { property: "og:description", content: "Conheça o Projetor Natalino LED na Morning Shop." },
    ],
  }),
  component: Index,
});

const STEPS = [
  ["Escolha", "Veja os detalhes e a ficha técnica do produto."],
  ["Clique em Comprar agora", "Você é levado ao checkout seguro do parceiro de pagamento."],
  ["Finalize o pedido", "Preencha seus dados e escolha a forma de pagamento no checkout."],
];

function Index() {
  const featured = PRODUCTS[0]!;
  const checkoutUrl = resolveCheckoutUrl(featured);
  return (
    <main>
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">Coleção de Natal</p>
            <h1 className="mt-4 text-4xl leading-tight md:text-6xl">
              Ilumine o seu Natal com o <span className="text-brand-gradient">Projetor LED</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">{featured.shortDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/produtos/$slug" params={{ slug: featured.slug }} className={btn("primary", "h-12 px-7")}>Conhecer o produto</Link>
              <Link to="/produtos" className={btn("outline", "h-12 px-7")}>Ver catálogo</Link>
            </div>
          </div>
          <img src={emblema.url} alt="" aria-hidden width={420} height={420} className="mx-auto w-64 drop-shadow-[0_0_40px_var(--cyan)] md:w-[420px]" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="destaque">
        <h2 id="destaque" className="text-3xl">Produto em destaque</h2>
        <div className="mt-8 grid items-center gap-8 rounded-3xl border bg-card p-6 md:grid-cols-2 md:p-10">
          <ProductImage product={featured} />
          <div>
            <h3 className="text-2xl">{featured.name}</h3>
            <ul className="mt-5 space-y-3">
              {featured.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-muted-foreground"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />{h}</li>
              ))}
            </ul>
            <div className="mt-6"><Price product={featured} /></div>
            <Link to="/produtos/$slug" params={{ slug: featured.slug }} className={btn("primary", "mt-6 h-12 px-7")}>Ver detalhes</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="como">
        <h2 id="como" className="text-3xl">Como comprar</h2>
        {checkoutUrl ? (
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="rounded-2xl border bg-card p-6">
                <span className="font-display text-4xl font-extrabold text-brand-gradient">{i + 1}</span>
                <h3 className="mt-2 text-lg">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p role="status" className="mt-8 max-w-3xl rounded-2xl border bg-card p-6 text-muted-foreground">
            No momento, a compra deste produto ainda não está disponível. Consulte a página do produto para ver as informações atuais.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16" aria-labelledby="faq">
        <h2 id="faq" className="text-3xl">Perguntas frequentes</h2>
        <div className="mt-8"><FaqList items={GENERAL_FAQ.slice(0, 3)} /></div>
        <Link to="/perguntas-frequentes" className="mt-4 inline-block text-primary hover:underline">Ver todas as dúvidas</Link>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-brand-gradient p-10 text-center md:p-14">
          <h2 className="text-3xl text-accent-foreground">Pronto para transformar sua decoração?</h2>
          <Link to="/produtos/$slug" params={{ slug: featured.slug }}
            className="mt-6 inline-flex h-12 items-center rounded-full bg-background px-8 font-display font-bold text-primary hover:brightness-125">
            Conhecer o Projetor Natalino LED
          </Link>
        </div>
      </section>
    </main>
  );
}

