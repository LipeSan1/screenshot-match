import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/morning-shop-logo.png.asset.json";
import { STORE } from "@/config/store";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/produtos", label: "Produtos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/perguntas-frequentes", label: "Dúvidas" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link to="/" aria-label="Morning Shop — página inicial" className="shrink-0">
          <img src={logo.url} alt="Morning Shop" width={64} height={64} className="h-16 w-16 rounded-md" />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="font-display text-sm font-semibold text-muted-foreground transition-colors hover:text-primary data-[status=active]:text-primary">
              {n.label}
            </Link>
          ))}
          <Link to="/contato" className={btn("primary", "h-10 px-5 text-sm")}>Contato</Link>
        </nav>
        <button className="md:hidden p-2 text-foreground" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t px-4 pb-4 md:hidden">
          {[...NAV, { to: "/contato", label: "Contato" } as const].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-3 font-display font-semibold text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <img src={logo.url} alt="Morning Shop" width={120} height={120} loading="lazy" className="h-28 w-28 rounded-lg" />
        </div>
        <FooterCol title="Loja" links={[["/produtos", "Produtos"], ["/sobre", "Sobre"], ["/perguntas-frequentes", "Perguntas frequentes"]]} />
        <FooterCol title="Políticas" links={[["/entrega", "Informações de entrega"], ["/trocas-e-devolucoes", "Trocas e devoluções"], ["/privacidade", "Privacidade"]]} />
        <div>
          <h4 className="mb-3 text-sm text-ice">Contato</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>{STORE.email || <Pending>E-mail a definir</Pending>}</li>
            <li>{STORE.whatsappNumber ? `WhatsApp +${STORE.whatsappNumber}` : <Pending>WhatsApp a definir</Pending>}</li>
            <li><Link to="/contato" className="text-primary hover:underline">Página de contato</Link></li>
          </ul>
        </div>
      </div>
      <p className="border-t py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Morning Shop</p>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm text-ice">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map(([to, l]) => (
          <li key={to}><Link to={to} className="text-muted-foreground hover:text-primary">{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export function Pending({ children }: { children: ReactNode }) {
  return <span className="rounded border border-warning/40 bg-warning/10 px-1.5 py-0.5 text-xs text-warning">{children}</span>;
}

export function btn(variant: "primary" | "outline", extra = "") {
  const base = "inline-flex items-center justify-center gap-2 rounded-full font-display font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const v = variant === "primary"
    ? "bg-brand-gradient text-accent-foreground shadow-glow hover:brightness-110"
    : "border border-primary/50 text-primary hover:bg-primary/10";
  return `${base} ${v} ${extra}`;
}

export function PageShell({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl md:text-4xl">{title}</h1>
      {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}
      <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:text-foreground">{children}</div>
    </main>
  );
}
