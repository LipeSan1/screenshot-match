import { describe, expect, it } from "vitest";
import { resolveCheckoutUrl } from "@/config/store";

describe("checkout Kaiross", () => {
  it("sem link configurado, não há compra", () => {
    expect(resolveCheckoutUrl({ checkoutUrl: "", availability: "pending" }, "")).toBeNull();
  });
  it("usa o link https configurado", () => {
    expect(resolveCheckoutUrl({ checkoutUrl: "", availability: "available" }, "https://pay.example/x")).toBe("https://pay.example/x");
  });
  it("produto indisponível bloqueia a compra", () => {
    expect(resolveCheckoutUrl({ checkoutUrl: "https://pay.example/x", availability: "unavailable" })).toBeNull();
  });
});
