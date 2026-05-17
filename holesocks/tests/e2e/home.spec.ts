import { test, expect } from "@playwright/test";

test.describe("Page d'accueil", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("affiche le titre principal HOLESOCKS", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "HOLESOCKS" })).toBeVisible();
  });

  test("affiche le tagline", async ({ page }) => {
    await expect(
      page.getByText("Parce que c'est pas un bug, c'est une feature.")
    ).toBeVisible();
  });

  test("le bouton 'Explorer la collection' navigue vers le catalogue", async ({
    page,
  }) => {
    await page.getByRole("link", { name: /explorer la collection/i }).click();
    await expect(page).toHaveURL("/catalogue");
  });

  test("affiche les trois niveaux de trou", async ({ page }) => {
    const section = page.getByRole("region", { name: /les trois niveaux/i });
    await expect(section.getByText("Léger", { exact: true }).first()).toBeVisible();
    await expect(section.getByText("Aéré", { exact: true }).first()).toBeVisible();
    await expect(section.getByText("Catastrophe", { exact: true }).first()).toBeVisible();
  });

  test("un clic sur une card de niveau navigue vers la page produit", async ({
    page,
  }) => {
    // La card du niveau 1 renvoie vers un produit
    const levelCard = page
      .getByRole("region", { name: /les trois niveaux/i })
      .getByRole("link")
      .first();
    await levelCard.click();
    await expect(page).toHaveURL(/\/produit\/.+/);
  });

  test("affiche la section manifeste avec les 3 piliers", async ({ page }) => {
    await expect(page.getByText("QUALITÉ VOLONTAIRE")).toBeVisible();
    await expect(page.getByText("TROIS NIVEAUX")).toBeVisible();
    await expect(page.getByText("HUMOUR INCLUS")).toBeVisible();
  });

  test("le CTA final 'Voir toute la collection' navigue vers le catalogue", async ({
    page,
  }) => {
    await page
      .getByRole("link", { name: /voir toute la collection/i })
      .click();
    await expect(page).toHaveURL("/catalogue");
  });
});

test.describe("Navbar", () => {
  test("affiche le logo HOLESOCKS avec lien vers l'accueil", async ({
    page,
  }) => {
    await page.goto("/catalogue");
    await page.getByRole("link", { name: "HOLESOCKS" }).click();
    await expect(page).toHaveURL("/");
  });

  test("les liens de niveau dans la navbar filtrent le catalogue", async ({
    page,
  }) => {
    await page.goto("/");
    // Lien "Léger" en nav
    await page
      .getByRole("navigation", { name: /navigation principale/i })
      .getByRole("link", { name: "Léger" })
      .click();
    await expect(page).toHaveURL(/\/catalogue\?level=1/);
  });

  test("le bouton 'Explorer' en nav navigue vers le catalogue", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: /navigation principale/i })
      .getByRole("link", { name: "Explorer" })
      .click();
    await expect(page).toHaveURL("/catalogue");
  });

  test("le lien d'accessibilité 'Aller au contenu principal' est présent", async ({
    page,
  }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", {
      name: /aller au contenu principal/i,
    });
    await expect(skipLink).toBeAttached();
  });
});
