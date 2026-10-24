import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Pending } from "@/components/site/Layout";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade — Morning Shop" },
      { name: "description", content: "Como a Morning Shop trata seus dados." },
      { property: "og:title", content: "Política de privacidade — Morning Shop" },
      { property: "og:description", content: "Como a Morning Shop trata seus dados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell title="Política de privacidade" intro="Texto em elaboração. Revise com orientação jurídica antes de publicar.">
      <h2>Dados coletados</h2>
      <p>Este site não possui cadastro nem armazena dados bancários ou de cartão. Os pagamentos são processados no ambiente do checkout do parceiro.</p>
      <h2>Responsável pelos dados</h2>
      <p><Pending>Razão social, CNPJ e contato do encarregado (LGPD) a definir</Pending></p>
      <h2>Cookies e ferramentas de análise</h2>
      <p><Pending>A definir conforme as ferramentas utilizadas</Pending></p>
    </PageShell>
  ),
});
