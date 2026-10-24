import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { PageShell, Pending, btn } from "@/components/site/Layout";
import { STORE, whatsappLink } from "@/config/store";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Morning Shop" },
      { name: "description", content: "Fale com a Morning Shop." },
      { property: "og:title", content: "Contato — Morning Shop" },
      { property: "og:description", content: "Fale com a Morning Shop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const wa = whatsappLink("Olá! Vim pelo site da Morning Shop.");
  return (
    <PageShell title="Contato" intro="Tire suas dúvidas antes ou depois da compra.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6">
          <MessageCircle className="h-6 w-6 text-primary" aria-hidden />
          <h2 className="!mt-3">WhatsApp</h2>
          {wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className={btn("primary", "mt-4 h-11 px-6")}>Abrir conversa</a> : <p className="mt-2"><Pending>Número a definir</Pending></p>}
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <Mail className="h-6 w-6 text-primary" aria-hidden />
          <h2 className="!mt-3">E-mail</h2>
          {STORE.email ? <a href={`mailto:${STORE.email}`} className="mt-2 block text-primary hover:underline">{STORE.email}</a> : <p className="mt-2"><Pending>E-mail a definir</Pending></p>}
        </div>
      </div>
      <p><strong className="text-foreground">Horário de atendimento:</strong> {STORE.supportHours}</p>
      <p><strong className="text-foreground">Endereço:</strong> {STORE.address} · CNPJ {STORE.cnpj}</p>
    </PageShell>
  );
}
