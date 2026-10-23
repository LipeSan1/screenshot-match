import { describe, expect, it } from "vitest";
import { resolveCheckoutUrl } from "@/config/store";

describe("checkout Kaiross", () => {
  it("mantém a compra bloqueada enquanto a disponibilidade está pendente", () => {
    expect(resolveCheckoutUrl({ checkoutUrl: "https://pay.example/x", availability: "pending" })).toBeNull();
  });

  it("bloqueia a compra quando o produto está indisponível", () => {
    expect(resolveCheckoutUrl({ checkoutUrl: "https://pay.example/x", availability: "unavailable" })).toBeNull();
  });

  it("bloqueia a compra disponível sem URL de checkout", () => {
    expect(resolveCheckoutUrl({ checkoutUrl: "", availability: "available" }, "")).toBeNull();
  });

  it.each(["http://pay.example/x", "https://", "not-a-url"])("bloqueia uma URL inválida: %s", (checkoutUrl) => {
    expect(resolveCheckoutUrl({ checkoutUrl, availability: "available" }, "")).toBeNull();
  });

  it("permite a compra disponível com URL HTTPS válida", () => {
    expect(resolveCheckoutUrl({ checkoutUrl: "", availability: "available" }, "https://pay.example/x")).toBe("https://pay.example/x");
  });
});

