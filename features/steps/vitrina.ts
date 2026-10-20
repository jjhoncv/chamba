import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

const FICHA = "/guias/cv-que-si-llama";

When("entro a la portada", async ({ page }) => {
  await page.goto("/");
});

Then("veo {string}, {string} y {string}", async ({ page }, a: string, b: string, c: string) => {
  for (const t of [a, b, c]) await expect(page.getByText(t, { exact: true })).toBeVisible();
});

Given("que entro a la ficha de {string} desde un celular", async ({ page }, _titulo: string) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(FICHA);
});

When("bajo hasta las preguntas frecuentes", async ({ page }) => {
  await page.getByRole("heading", { name: "Preguntas frecuentes" }).scrollIntoViewIfNeeded();
});

Then("sigo viendo el botón {string}", async ({ page }, nombre: string) => {
  const boton = page.getByRole("button", { name: nombre });
  await expect(boton).toBeVisible();
  await expect(boton).toBeInViewport({ ratio: 1 });
});

When("entro a la portada y a una ficha desde un celular chico", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
});

Then("no hay que moverse hacia los costados y todo se lee y se toca bien", async ({ page }) => {
  for (const ruta of ["/", FICHA]) {
    await page.goto(ruta);
    const r = await page.evaluate(() => {
      const el = document.documentElement;
      const tocables = [...document.querySelectorAll("a[href], button, summary")];
      const textos = [...document.querySelectorAll("body *")].filter((e) =>
        [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent?.trim()),
      );
      return {
        desborde: el.scrollWidth > el.clientWidth,
        tocablesChicos: tocables
          .filter((e) => {
            const b = e.getBoundingClientRect();
            return b.width < 44 || b.height < 44;
          })
          .map((e) => e.textContent?.trim()),
        textosChicos: textos
          .filter((e) => parseFloat(getComputedStyle(e).fontSize) < 16)
          .map((e) => e.textContent?.trim()),
      };
    });
    expect(r.desborde, `scroll horizontal en ${ruta}`).toBe(false);
    expect(r.tocablesChicos, `tocables < 44px en ${ruta}`).toEqual([]);
    expect(r.textosChicos, `texto < 16px en ${ruta}`).toEqual([]);
  }
});
