// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import Page from "./page";
import { guias, pasos, senalesDeConfianza } from "@/lib/guias-prueba";

afterEach(cleanup);

// E1 — Proyecto nuevo en producción el día 1: la página muestra el nombre del PROYECTO.md,
// sea cual sea (la plantilla no puede fijar un nombre).
it("muestra como título principal el # título de PROYECTO.md", () => {
  const titulo = readFileSync("PROYECTO.md", "utf8").match(/^#[ \t]+(.+?)[ \t]*$/m)?.[1];
  render(<Page />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(titulo);
});

it("muestra banner, franja de confianza y la grilla con precios", () => {
  render(<Page />);
  expect(screen.getByRole("heading", { name: "Consigue tu primera chamba" })).toBeTruthy();
  expect(screen.getByRole("link", { name: "Ver guías" }).getAttribute("href")).toBe("#guias");
  for (const s of senalesDeConfianza) expect(screen.getByText(s)).toBeTruthy();
  for (const g of guias) expect(screen.getByRole("link", { name: new RegExp(g.titulo) })).toBeTruthy();
  expect(screen.getByText("S/ 25").tagName).toBe("S");
});

it("muestra la oferta, los medios de pago y los 3 pasos de «Cómo funciona»", () => {
  render(<Page />);
  expect(screen.getByText("-40 %")).toBeTruthy();
  expect(screen.getByText("Ahorras S/ 10")).toBeTruthy();
  for (const m of ["Mercado Pago", "Yape", "Visa", "Mastercard"]) expect(screen.getByAltText(m)).toBeTruthy();
  expect(screen.getByRole("heading", { name: "Cómo funciona" })).toBeTruthy();
  expect(pasos).toHaveLength(3);
  for (const p of pasos) expect(screen.getByRole("heading", { name: new RegExp(p.titulo) })).toBeTruthy();
});
