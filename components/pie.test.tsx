// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Pie } from "./pie";
import { contacto } from "@/lib/contacto";
import { guias } from "@/lib/guias-prueba";

afterEach(cleanup);

it("el pie tiene columnas de guías, ayuda y contacto", () => {
  render(<Pie />);
  const pie = screen.getByRole("contentinfo");
  expect(pie.textContent).toContain("Chamba");
  for (const h of ["Guías", "Ayuda", "Contacto"]) expect(screen.getByRole("heading", { name: h })).toBeTruthy();
  for (const g of guias) expect(screen.getByRole("link", { name: g.titulo })).toBeTruthy();
  expect(screen.getByRole("link", { name: contacto.correo }).getAttribute("href")).toBe(`mailto:${contacto.correo}`);
  expect(screen.getByRole("link", { name: /WhatsApp/ }).getAttribute("href")).toBe(contacto.whatsappUrl);
});
