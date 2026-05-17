/**
 * Catalogue Page
 * Displays all products
 * Client-side filtering handled by the CatalogueClient component
 */

import { CatalogueClient } from "@/components/catalogue/CatalogueClient";
import { PRODUCTS } from "@/data/products";

export default function CataloguePage() {
  return <CatalogueClient initialProducts={PRODUCTS} />;
}
