import { expect, it } from "vitest";
import { ahorro, descuento } from "./guias-prueba";

it("calcula el ahorro y el descuento de la oferta", () => {
  expect(ahorro(15, 25)).toBe(10);
  expect(descuento(15, 25)).toBe(40);
});
