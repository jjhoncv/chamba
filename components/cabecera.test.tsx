// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Cabecera } from "./cabecera";
import { contacto } from "@/lib/contacto";

afterEach(cleanup);

it("la cabecera tiene logo, WhatsApp y correo de contacto", () => {
  render(<Cabecera principal />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Chamba");
  expect(screen.getByRole("link", { name: "WhatsApp" }).getAttribute("href")).toBe(contacto.whatsappUrl);
  expect(screen.getByRole("link", { name: contacto.correo }).getAttribute("href")).toBe(`mailto:${contacto.correo}`);
});

it("sin `principal` el logo no es un h1 (la ficha ya tiene el suyo)", () => {
  render(<Cabecera />);
  expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
});
