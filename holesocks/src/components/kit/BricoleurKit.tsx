/**
 * BricoleurKit Component
 * Cross-sell component showing "Kit du Bricoleur" recommendations
 */

import Link from "next/link";
import type { Product } from "@/types/product";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface BricoleurKitProps {
  relatedProducts: Product[];
}

export function BricoleurKit({ relatedProducts }: BricoleurKitProps) {
  return (
    <section aria-label="Produits liés" className="bg-charbon rounded p-8">
      <div className="mb-8">
        <h2 className="font-display text-3xl tracking-wide text-creme mb-2">
          KIT DU BRICOLEUR
        </h2>
        <p className="font-editorial italic text-creme/60">
          Complétez votre collection avec ces chaussettes du même niveau.
        </p>
      </div>

      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/produit/${product.id}`}
              className="group block"
            >
              <div className="bg-creme rounded overflow-hidden group-hover:-translate-y-1 group-hover:shadow-lg transition-all duration-200 h-full flex flex-col">
                <div className="relative w-full h-40 bg-charbon/10 overflow-hidden">
                  {product.imageUrl ? (
                    <OptimizedImage
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-40 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-editorial italic text-gris text-sm">
                      [{product.name}]
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1 gap-2">
                  <h3 className="font-display text-xl tracking-wide text-charbon">
                    {product.name}
                  </h3>
                  <p className="font-editorial italic text-sm text-gris line-clamp-2 flex-1">
                    {product.tagline}
                  </p>
                  <span className="font-ui font-semibold text-xs uppercase tracking-wider text-terra">
                    Adopter ce trou →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="font-editorial italic text-creme/60">
          Pas d'autres produits disponibles au même niveau.
        </p>
      )}
    </section>
  );
}
