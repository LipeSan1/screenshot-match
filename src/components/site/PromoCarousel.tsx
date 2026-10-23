import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import emblema from "@/assets/morning-shop-emblema.png.asset.json";
import { type Product } from "@/config/store";
import { btn } from "@/components/site/Layout";

export function PromoCarousel({ product }: { product: Product }) {
  const slides = [
    {
      eyebrow: "Decoração de Natal",
      title: "Ilumine o seu Natal com projeções em movimento",
      copy: product.shortDescription,
      label: "Conhecer o projetor",
    },
    {
      eyebrow: "Detalhes do produto",
      title: product.highlights[0] ?? product.name,
      copy: product.description,
      label: "Ver detalhes",
    },
    {
      eyebrow: "Prático para sua decoração",
      title: product.highlights[1] ?? product.name,
      copy: "Conheça os detalhes e as informações disponíveis sobre o produto.",
      label: "Explorar produto",
    },
  ];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, reducedMotion, slides.length]);

  const slide = slides[active]!;
  const change = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section aria-label="Destaques da Morning Shop" aria-roledescription="carrossel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      className="relative isolate overflow-hidden rounded-3xl border border-primary/40 bg-hero-glow shadow-glow">
      <div className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="grid min-h-[390px] items-center gap-8 px-6 py-10 md:grid-cols-[1.4fr_0.6fr] md:px-12 md:py-14">
        <div key={active} className="animate-in fade-in duration-500">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">{slide.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-5xl"><span className="text-brand-gradient">{slide.title}</span></h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground line-clamp-3">{slide.copy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/produtos/$slug" params={{ slug: product.slug }} className={btn("primary", "h-12 px-7")}>{slide.label}</Link>
            <Link to="/produtos" className={btn("outline", "h-12 px-7")}>Ver catálogo</Link>
          </div>
        </div>
        <div aria-hidden className="hidden items-center justify-center md:flex">
          <div className="flex h-48 w-48 items-center justify-center rounded-full border border-primary/40 bg-secondary/40 shadow-glow">
            <img src={emblema.url} alt="" width={170} height={170} loading="lazy" decoding="async" className="h-40 w-40 object-contain drop-shadow-[0_0_24px_var(--cyan)]" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-primary/20 px-4 py-3 md:px-8">
        <div className="flex items-center gap-2" aria-label={`Destaque ${active + 1} de ${slides.length}`}>
          {slides.map((item, index) => <button key={item.eyebrow} type="button" onClick={() => setActive(index)}
            aria-label={`Mostrar destaque ${index + 1}`} aria-current={index === active ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all ${index === active ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/50 hover:bg-primary/70"}`} />)}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => change(-1)} aria-label="Destaque anterior" className="rounded-full border p-2 hover:border-primary"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => change(1)} aria-label="Próximo destaque" className="rounded-full border p-2 hover:border-primary"><ChevronRight className="h-4 w-4" /></button>
          <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Retomar troca automática" : "Pausar troca automática"} className="rounded-full border p-2 hover:border-primary">
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}

