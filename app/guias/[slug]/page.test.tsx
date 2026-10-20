// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Page from "./page";

it("la ficha tiene las secciones de venta y el botón Comprar inactivo", async () => {
  render(await Page({ params: Promise.resolve({ slug: "cv-que-si-llama" }) }));
  for (const h of ["Qué vas a lograr", "Para quién es", "Qué incluye", "Preguntas frecuentes"]) {
    expect(screen.getByRole("heading", { name: h })).toBeTruthy();
  }
  const boton = screen.getByRole("button", { name: "Comprar · S/ 15" });
  expect((boton as HTMLButtonElement).disabled).toBe(true);
});
