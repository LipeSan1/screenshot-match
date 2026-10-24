import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Layout";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/trocas-e-devolucoes")({
  head: () => ({
    meta: [
      { title: "Trocas, devoluções e cancelamentos — Morning Shop" },
      { name: "description", content: "Política de trocas, devoluções e cancelamentos da Morning Shop." },
      { property: "og:title", content: "Trocas e devoluções — Morning Shop" },
      { property: "og:description", content: "Política de trocas, devoluções e cancelamentos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell title="Trocas, devoluções e cancelamentos" intro="Queremos que você fique satisfeito com sua compra. Veja abaixo como funcionam trocas, devoluções e reembolsos.">
      <h2>Direito de arrependimento (7 dias)</h2>
      <p>Conforme o art. 49 do Código de Defesa do Consumidor, você pode desistir da compra em até 7 dias corridos a partir do recebimento do produto, sem precisar justificar. O produto deve ser devolvido com todos os acessórios e, de preferência, na embalagem original. O custo do envio de devolução nesse caso é por nossa conta.</p>
      <h2>Produto com defeito</h2>
      <p>Os produtos têm garantia legal de 90 dias contra defeitos de fabricação (art. 26 do CDC). Se identificar um defeito, entre em contato informando o número do pedido, uma descrição do problema e fotos ou vídeo. Após a análise, faremos a troca por um item igual ou, se não houver estoque, o reembolso integral, em até 30 dias.</p>
      <h2>Produto errado ou danificado na entrega</h2>
      <p>Caso receba um produto diferente do pedido ou avariado no transporte, avise-nos em até 7 dias após o recebimento, com fotos da embalagem e do produto. Faremos o reenvio ou o reembolso sem custo para você.</p>
      <h2>Como solicitar</h2>
      <p>Fale com nosso atendimento pelo WhatsApp ou pelo e-mail {STORE.email}, informando nome, número do pedido e o motivo. Enviaremos as instruções de postagem da devolução. Atendimento: {STORE.supportHours}.</p>
      <h2>Cancelamentos e reembolsos</h2>
      <p>Pedidos ainda não enviados podem ser cancelados a qualquer momento pelo atendimento. O reembolso é feito pela mesma forma de pagamento: Pix em até 7 dias úteis; cartão de crédito com estorno solicitado em até 7 dias úteis, podendo aparecer em até duas faturas, conforme a operadora; boleto por transferência para conta indicada pelo titular.</p>
      <p className="text-sm">{STORE.name} · CNPJ {STORE.cnpj} · {STORE.address}</p>
    </PageShell>
  ),
});
