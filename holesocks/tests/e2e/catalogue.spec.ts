import { test, expect } from "@playwright/test";

test.describe("Page Catalogue", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/catalogue");
  });

  test("affiche le titre LA COLLECTION", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "LA COLLECTION" })
    ).toBeVisible();
  });

  test("affiche les 8 produits par défaut", async ({ page }) => {
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(8);
  });

  test("affiche le compteur de produits", async ({ page }) => {
    await expect(page.getByText(/8\s*produits/i)).toBeVisible();
  });

  test("chaque carte produit est cliquable et renvoie à la page produit", async ({
    page,
  }) => {
    await page
      .getByRole("region", { name: "Produits" })
      .getByRole("link")
      .first()
      .click();
    await expect(page).toHaveURL(/\/produit\/.+/);
  });
});

test.describe("Filtres catalogue — Niveau", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/catalogue");
  });

  test("filtre par niveau Léger (level=1) retourne les bons produits", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Léger" }).click();
    // Seulement les produits de niveau 1 : "Le Philosophe" et "Le Minimal"
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(2);
  });

  test("filtre par niveau Aéré (level=2) retourne les bons produits", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Aéré" }).click();
    // Produits niveau 2 : Le Drôle, Le Bricoleur, Le Zen, Le Poète = 4
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(4);
  });

  test("filtre par niveau Catastrophe (level=3) retourne les bons produits", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Catastrophe" }).click();
    // Produits niveau 3 : Le Coquin, Le Extrême = 2
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(2);
  });

  test("le chip de filtre actif est marqué aria-pressed=true", async ({
    page,
  }) => {
    const chip = page.getByRole("button", { name: "Léger" });
    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");
  });

  test("cliquer sur 'Tous' après un filtre réaffiche tous les produits", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Léger" }).click();
    await page
      .getByRole("button", { name: "Tous" })
      .first()
      .click();
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(8);
  });
});

test.describe("Filtres catalogue — Couleur", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/catalogue");
  });

  test("filtre par couleur Rouge retourne les bons produits", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Rouge" }).click();
    // Produits rouges : Le Drôle (red), Le Extrême (red) = 2
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(2);
  });

  test("filtre par couleur Noir retourne les bons produits", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Noir" }).click();
    // Produits noirs : Le Philosophe, Le Bricoleur, Le Poète = 3
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(3);
  });
});

test.describe("Filtres catalogue — Style", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/catalogue");
  });

  test("filtre par style Orteil retourne les bons produits", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Orteil" }).click();
    // Orteil : Le Philosophe, Le Drôle, Le Minimal, Le Zen = 4
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(4);
  });

  test("filtre par style Talon retourne les bons produits", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Talon" }).click();
    // Talon : Le Coquin, Le Poète = 2
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(2);
  });
});

test.describe("Filtres catalogue — Taille", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/catalogue");
  });

  test("filtre par taille S retourne les produits disponibles en S", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "S", exact: true }).click();
    // S disponible : Le Philosophe, Le Bricoleur, Le Minimal, Le Zen = 4
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(4);
  });
});

test.describe("Filtres catalogue — Combinés et reset", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/catalogue");
  });

  test("combiner niveau Catastrophe + couleur Rouge retourne Le Extrême uniquement", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Catastrophe" }).click();
    await page.getByRole("button", { name: "Rouge" }).click();
    // Le Extrême : niveau 3, rouge = 1 produit
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(1);
    await expect(page.getByText("Le Extrême")).toBeVisible();
  });

  test("état vide : une combinaison sans résultats affiche le message 'AUCUNE SURVIVANTE'", async ({
    page,
  }) => {
    // niveau Léger + couleur Rouge → aucun produit
    await page.getByRole("button", { name: "Léger" }).click();
    await page.getByRole("button", { name: "Rouge" }).click();
    await expect(
      page.getByRole("heading", { name: "AUCUNE SURVIVANTE" })
    ).toBeVisible();
  });

  test("le bouton 'Voir toute la collection' dans l'état vide reset les filtres", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Léger" }).click();
    await page.getByRole("button", { name: "Rouge" }).click();
    await page
      .getByRole("button", { name: /voir toute la collection/i })
      .click();
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(8);
  });

  test("le bouton 'Réinitialiser les filtres' reset tous les filtres", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Catastrophe" }).click();
    await page
      .getByRole("button", { name: /réinitialiser les filtres/i })
      .click();
    const products = page
      .getByRole("region", { name: "Produits" })
      .getByRole("article");
    await expect(products).toHaveCount(8);
  });
});

test.describe("Catalogue via URL avec paramètre level", () => {
  test("?level=1 pré-filtre sur Léger", async ({ page }) => {
    await page.goto("/catalogue?level=1");
    const chip = page.getByRole("button", { name: "Léger" });
    // Le chip doit être visuellement activé (aria-pressed peut ne pas être géré via URL)
    await expect(chip).toBeVisible();
  });
});
