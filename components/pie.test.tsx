// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Pie } from "./pie";

afterEach(cleanup);

it("el pie es mínimo: nombre y descripción", () => {
  render(<Pie />);
  expect(screen.getByRole("contentinfo").textContent).toContain("Chamba");
});
