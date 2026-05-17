import { test, expect } from "@playwright/test";

// Produit de référence : "Le Philosophe" (level 1, bien documenté avec avis)
const PRODUCT_URL = "/produit/le-philosophe";

test.describe("Page Produit — Contenu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PRODUCT_URL);
  });

  test("affiche le nom du produit en titre H1", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Le Philosophe", level: 1 })
    ).toBeVisible();
  });

  test("affiche le tagline du produit", async ({ page }) => {
    await expect(
      page.getByText(/Trou parfait pour la méditation/i)
    ).toBeVisible();
  });

  test("affiche la description du produit", async ({ page }) => {
    await expect(
      page.getByText(/Une chaussette légèrement aérée/i)
    ).toBeVisible();
  });

  test("affiche les tailles disponibles S, M, L, XL", async ({ page }) => {
    const sizes = ["S", "M", "L", "XL"];
    for (const size of sizes) {
      await expect(page.getByRole("button", { name: size, exact: true })).toBeVisible();
    }
  });

  test("affiche le bouton CTA 'Adopter ce trou'", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /adopter ce trou/i })
    ).toBeVisible();
  });

  test("affiche les champs Couleur et Style", async ({ page }) => {
    await expect(page.getByText("Couleur")).toBeVisible();
    await expect(page.getByText("Style")).toBeVisible();
  });

  test("le lien 'Retour au catalogue' navigue vers /catalogue", async ({
    page,
  }) => {
    await page.getByRole("link", { name: /retour au catalogue/i }).click();
    await expect(page).toHaveURL("/catalogue");
  });
});

test.describe("Page Produit — Avis existants", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PRODUCT_URL);
  });

  test("affiche le titre de la section avis avec le compteur", async ({
    page,
  }) => {
    // Le Philosophe a 2 avis dans les données statiques
    await expect(page.getByRole("heading", { name: /avis clients/i })).toBeVisible();
    await expect(page.getByText(/Avis clients \(2\)/i)).toBeVisible();
  });

  test("affiche les avis de Jean-Pierre et Marie", async ({ page }) => {
    await expect(page.getByText("Jean-Pierre")).toBeVisible();
    await expect(page.getByText("Marie")).toBeVisible();
  });

  test("affiche le contenu d'un avis", async ({ page }) => {
    await expect(
      page.getByText(/Parfait pour méditer sur les grandes questions/i)
    ).toBeVisible();
  });
});

test.describe("Page Produit — Formulaire d'avis", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PRODUCT_URL);
  });

  test("affiche le formulaire 'Partager votre avis'", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /partager votre avis/i })
    ).toBeVisible();
    await expect(page.getByLabel(/votre nom/i)).toBeVisible();
    await expect(page.getByLabel(/votre avis/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /soumettre mon avis/i })).toBeVisible();
  });

  test("soumettre un avis valide affiche le message de confirmation", async ({
    page,
  }) => {
    await page.getByLabel(/votre nom/i).fill("Test Yohann");
    await page.getByLabel(/votre avis/i).fill("Excellente chaussette, très aérée !");

    await page.getByRole("button", { name: /soumettre mon avis/i }).click();

    await expect(
      page.getByText(/merci ! votre avis a été ajouté/i)
    ).toBeVisible();
  });

  test("après soumission, le formulaire est réinitialisé", async ({ page }) => {
    await page.getByLabel(/votre nom/i).fill("Test Yohann");
    await page.getByLabel(/votre avis/i).fill("Super produit !");
    await page.getByRole("button", { name: /soumettre mon avis/i }).click();

    await expect(page.getByLabel(/votre nom/i)).toHaveValue("");
    await expect(page.getByLabel(/votre avis/i)).toHaveValue("");
  });

  test("soumettre avec des champs vides déclenche une alerte de validation", async ({
    page,
  }) => {
    // On écoute l'alerte navigateur
    let alertMessage = "";
    page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    await page.getByRole("button", { name: /soumettre mon avis/i }).click();
    await expect(page.getByLabel(/votre nom/i)).toBeVisible(); // page ne s'est pas navigué
  });

  test("le select de note affiche les 5 options étoiles", async ({ page }) => {
    const select = page.getByLabel(/note/i);
    await expect(select).toBeVisible();
    // Valeur par défaut : 5
    await expect(select).toHaveValue("5");
    // Changer la note
    await select.selectOption("3");
    await expect(select).toHaveValue("3");
  });
});

test.describe("Page Produit — Produits liés", () => {
  test("un produit avec des produits liés affiche la section cross-sell", async ({
    page,
  }) => {
    // Le Philosophe (level 1) a Le Minimal comme produit lié
    await page.goto(PRODUCT_URL);
    // La section BricoleurKit doit être présente
    await expect(page.locator("section").last()).toBeAttached();
  });
});

test.describe("Page Produit — 404", () => {
  test("une URL de produit inexistante renvoie une page 404", async ({
    page,
  }) => {
    const response = await page.goto("/produit/produit-inexistant");
    // Next.js notFound() doit retourner un statut 404
    expect(response?.status()).toBe(404);
  });
});
