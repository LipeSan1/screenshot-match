import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ImageOff, MessageCircle, ShoppingBag } from "lucide-react";
import { type Product, formatPrice, resolveCheckoutUrl, whatsappLink } from "@/config/store";
import { Pending, btn } from "./Layout";

export function ProductImage({ product, className = "" }: { product: Product; className?: string }) {
  const img = product.images[0];
  if (img) return <img src={img.src} alt={img.alt} loading="lazy" className={`aspect-square w-full rounded-2xl object-cover ${className}`} />;
  return <ImagePlaceholder className={className} />;
}

function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="Foto do produto pendente" className={`flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-secondary/40 text-muted-foreground ${className}`}>
      <ImageOff className="h-8 w-8" aria-hidden />
      <span className="text-sm">Foto real do fornecedor pendente</span>
    </div>
  );
}

export function Gallery({ product }: { product: Product }) {
  const [i, setI] = useState(0);
  if (!product.images.length) return <ImagePlaceholder />;
  const cur = product.images[i];
  return (
    <div>
      <img src={cur.src} alt={cur.alt} className="aspect-square w-full rounded-2xl object-cover" />
      {product.images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {product.images.map((im, k) => (
            <button key={im.src} onClick={() => setI(k)} aria-label={`Ver foto ${k + 1}`} aria-pressed={k === i}
              className={`overflow-hidden rounded-lg border-2 ${k === i ? "border-primary" : "border-transparent"}`}>
              <img src={im.src} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Price({ product }: { product: Product }) {
  const p = formatPrice(product.price);
  return p ? <span className="font-display text-3xl font-extrabold text-ice">{p}</span> : <Pending>Preço a definir</Pending>;
}

export function BuyActions({ product }: { product: Product }) {
  const url = resolveCheckoutUrl(product);
  const wa = whatsappLink(`Olá! Tenho uma dúvida sobre o ${product.name}.`);
  return (
    <div className="space-y-3">
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className={btn("primary", "h-14 w-full text-lg")}>
          <ShoppingBag className="h-5 w-5" aria-hidden /> Comprar agora
        </a>
      ) : (
        <>
          <button disabled className={btn("primary", "h-14 w-full text-lg")}>
            <ShoppingBag className="h-5 w-5" aria-hidden /> Comprar agora
          </button>
          <p role="status" className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
            {product.availability === "unavailable"
              ? "Produto indisponível no momento."
              : "Compra temporariamente indisponível. Fale com a gente para tirar dúvidas."}
          </p>
        </>
      )}
      {wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={btn("outline", "h-12 w-full")}>
          <MessageCircle className="h-5 w-5" aria-hidden /> Tirar dúvidas no WhatsApp
        </a>
      ) : (
        <Link to="/contato" className={btn("outline", "h-12 w-full")}>
          <MessageCircle className="h-5 w-5" aria-hidden /> Tirar dúvidas
        </Link>
      )}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/produtos/$slug" params={{ slug: product.slug }}
      className="group block rounded-2xl border bg-card p-4 transition hover:border-primary/60 hover:shadow-glow">
      <ProductImage product={product} />
      <h3 className="mt-4 text-lg group-hover:text-primary">{product.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{product.shortDescription}</p>
      <div className="mt-3"><Price product={product} /></div>
    </Link>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y rounded-2xl border bg-card">
      {items.map((f) => (
        <details key={f.q} className="group p-5">
          <summary className="cursor-pointer list-none font-display font-semibold text-foreground marker:hidden">
            <span className="mr-2 text-primary group-open:hidden">+</span><span className="mr-2 hidden text-primary group-open:inline">−</span>{f.q}
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
