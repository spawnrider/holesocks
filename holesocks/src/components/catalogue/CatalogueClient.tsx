"use client";

import { FilterBar } from "@/components/filters/FilterBar";
import { ProductCard } from "@/components/product/ProductCard";
import { useFilters } from "@/lib/useFilters";
import type { Product } from "@/types/product";

interface CatalogueClientProps {
  initialProducts: Product[];
}

export function CatalogueClient({ initialProducts }: CatalogueClientProps) {
  const { filters, setFilter, clearFilters, applyFilters } = useFilters();

  const filteredProducts = applyFilters(initialProducts);
  const isFiltered = Object.keys(filters).length > 0;

  return (
    <div className="min-h-screen bg-creme pt-[72px]">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-charbon mb-2">
            LA COLLECTION
          </h1>
          <p className="font-editorial italic text-gris text-lg">
            Explorez notre collection de chaussettes trouées pour tous les niveaux
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-[72px] pt-4">
              <FilterBar
                filters={filters}
                setFilter={setFilter}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Products */}
          <section className="lg:col-span-3" aria-label="Produits">
            {/* Results count */}
            <div className="mb-6">
              <p className="font-ui text-sm text-gris">
                {isFiltered ? (
                  <>
                    <span className="font-semibold text-charbon">{filteredProducts.length}</span>{" "}
                    chaussette{filteredProducts.length !== 1 ? "s" : ""} vous attendent.
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-charbon">{filteredProducts.length}</span>{" "}
                    produit{filteredProducts.length !== 1 ? "s" : ""}
                  </>
                )}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty state brand */
              <div className="py-20 flex flex-col items-center text-center gap-6">
                <div className="w-24 h-24 rounded-full bg-charbon/5 flex items-center justify-center text-5xl select-none" aria-hidden="true">
                  🕳️
                </div>
                <h2 className="font-display text-4xl md:text-5xl tracking-wide text-charbon">
                  AUCUNE SURVIVANTE
                </h2>
                <p className="font-editorial italic text-gris text-lg max-w-sm">
                  Ce niveau de filtre est redoutable. Nos chaussettes capitulent.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-acidule text-charbon font-ui font-bold text-sm uppercase tracking-wider rounded hover:bg-charbon hover:text-creme transition-colors duration-150 min-h-[44px]"
                >
                  Voir toute la collection
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
