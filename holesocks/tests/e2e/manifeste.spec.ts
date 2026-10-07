import { test, expect } from "@playwright/test";

test.describe("Page manifeste", () => {
  test("le bouton 'Notre manifeste' depuis l'accueil navigue vers /manifeste", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /notre manifeste/i }).click();
    await expect(page).toHaveURL("/manifeste");
  });

  test("affiche le titre principal du manifeste", async ({ page }) => {
    await page.goto("/manifeste");
    await expect(
      page.getByRole("heading", { name: "POURQUOI DES TROUS ?" })
    ).toBeVisible();
  });

  test("affiche le contenu sur le pourquoi de HoleSocks", async ({ page }) => {
    await page.goto("/manifeste");
    await expect(
      page.getByText(/toutes les chaussettes finissent trouées/i)
    ).toBeVisible();
  });

  test("affiche les 3 piliers du concept", async ({ page }) => {
    await page.goto("/manifeste");
    const section = page.getByRole("region", {
      name: /le concept holesocks en détail/i,
    });
    await expect(section.getByText("QUALITÉ VOLONTAIRE")).toBeVisible();
    await expect(section.getByText("TROIS NIVEAUX")).toBeVisible();
    await expect(section.getByText("HUMOUR INCLUS")).toBeVisible();
  });

  test("le CTA final navigue vers le catalogue", async ({ page }) => {
    await page.goto("/manifeste");
    await page
      .getByRole("link", { name: /explorer la collection/i })
      .click();
    await expect(page).toHaveURL("/catalogue");
  });
});
