/**
 * Configuração central da Morning Shop.
 * Edite aqui preços, links, imagens, disponibilidade e contato — as páginas leem tudo daqui.
 * Campos vazios ("") aparecem no site como "informação pendente".
 */

/** Link oficial de checkout da Kaiross. Deixe vazio até ser confirmado e testado. */
export const KAIROSS_CHECKOUT_URL = "";

export const STORE = {
  name: "Morning Shop",
  /** Número de WhatsApp com DDI e DDD, só dígitos. Ex.: "5511999999999" */
  whatsappNumber: "",
  email: "",
  /** Texto padrão de prazo de entrega exibido no site. */
  deliveryInfo: "",
};

export type Availability = "available" | "unavailable" | "pending";

export interface Product {
  slug: string;
  name: string;
  fullName: string;
  /** Preço em reais. null = a definir. */
  price: number | null;
  availability: Availability;
  /** Link de checkout específico; se vazio, usa KAIROSS_CHECKOUT_URL. */
  checkoutUrl: string;
  /** URLs de fotos reais e autorizadas do fornecedor. */
  images: { src: string; alt: string }[];
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  included: string[];
  deliveryInfo: string;
  faq: { q: string; a: string }[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "projetor-natalino-led",
    name: "Projetor Natalino LED",
    fullName: "Projetor LED Natalino Desenhos Decorativos Luzes Dinâmicas USB Bivolt — Cores Sortidas",
    price: null,
    availability: "pending",
    checkoutUrl: "",
    images: [],
    shortDescription:
      "Projeções natalinas em movimento com LED RGB para fachadas, jardins, vitrines e festas.",
    description:
      "O Projetor LED Natal Desenhos é a solução ideal para decorar sua casa e jardim com imagens natalinas vibrantes, nítidas e em movimento. Com tecnologia LED RGB, ele projeta desenhos típicos do Natal, como Papai Noel, rena e boneco de neve. O aparelho é bivolt, fácil de instalar e perfeito para fachadas, jardins, vitrines, festas e eventos, sem a necessidade de longas instalações ou múltiplos cabos. Seu baixo consumo de energia o torna uma alternativa econômica às tradicionais luzes pisca-pisca.",
    highlights: [
      "Imagens dinâmicas: projeções em movimento com desenhos clássicos do Natal.",
      "Bivolt automático: funciona em 110V e 220V.",
      "LED de baixo consumo que cobre grandes áreas sem muitos cabos.",
      "Instalação rápida: posicione, ligue e pronto.",
    ],
    specs: [
      { label: "Tecnologia", value: "LED RGB com projeção em movimento" },
      { label: "Desenhos", value: "Árvores, presentes, Papai Noel, rena, boneco de neve, trenó, sino e meia (sortidos)" },
      { label: "Potência", value: "Aproximadamente 10 W" },
      { label: "Voltagem", value: "Bivolt automático 110V/220V" },
      { label: "Área de projeção", value: "Varia conforme a distância e o ambiente" },
      { label: "Cor da luz", value: "RGB (múltiplas cores)" },
      { label: "Uso recomendado", value: "Residencial, comercial, eventos — ambientes internos e externos protegidos" },
      { label: "Material", value: "Corpo compacto, com base para fixação em solo ou superfície plana" },
    ],
    included: ["1x Projetor LED Natal Desenhos", "Manual de instruções"],
    deliveryInfo: "",
    faq: [
      { q: "Funciona em 110V e 220V?", a: "Sim. O projetor é bivolt automático (110V/220V), segundo o fornecedor." },
      { q: "Quais desenhos ele projeta?", a: "Árvores, presentes, Papai Noel, rena, boneco de neve, trenó, sino e meia. Os desenhos são sortidos." },
      { q: "Posso usar ao ar livre?", a: "O fornecedor recomenda uso interno e externo em áreas protegidas." },
      { q: "O que vem na caixa?", a: "1 projetor e o manual de instruções." },
    ],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

/** Retorna o link de compra válido do produto, ou null se ainda não configurado. */
export function resolveCheckoutUrl(p: Pick<Product, "checkoutUrl" | "availability">, fallback = KAIROSS_CHECKOUT_URL): string | null {
  if (p.availability === "unavailable") return null;
  const url = (p.checkoutUrl || fallback).trim();
  return /^https:\/\//.test(url) ? url : null;
}

export function whatsappLink(message?: string): string | null {
  if (!STORE.whatsappNumber) return null;
  const q = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${STORE.whatsappNumber}${q}`;
}

export const formatPrice = (v: number | null) =>
  v === null ? null : v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
