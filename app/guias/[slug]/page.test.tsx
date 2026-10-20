// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import Page from "./page";

afterEach(cleanup);

it("la ficha tiene las secciones de venta y el botón Comprar inactivo", async () => {
  render(await Page({ params: Promise.resolve({ slug: "cv-que-si-llama" }) }));
  for (const h of ["Qué vas a lograr", "Para quién es", "Qué incluye", "Preguntas frecuentes"]) {
    expect(screen.getByRole("heading", { name: h })).toBeTruthy();
  }
  const boton = screen.getByRole("button", { name: "Comprar · S/ 15" });
  // Se ve activo (color de marca) pero todavía no hace nada: Fase 2.
  expect(boton.getAttribute("aria-disabled")).toBe("true");
});

it("la ficha muestra la oferta y «Qué vas a lograr» como tarjetas", async () => {
  render(await Page({ params: Promise.resolve({ slug: "cv-que-si-llama" }) }));
  expect(screen.getByText("-40 %")).toBeTruthy();
  expect(screen.getByText("Ahorras S/ 10")).toBeTruthy();
  expect(screen.getAllByTestId("logro")).toHaveLength(3);
});
