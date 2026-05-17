import Link from "next/link";
import type { Product } from "@/types/product";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface ProductCardProps {
  product: Product;
}

const LEVEL_CONFIG = {
  1: { label: "Léger", bg: "bg-sauge", text: "text-creme" },
  2: { label: "Aéré", bg: "bg-ambre", text: "text-charbon" },
  3: { label: "Catastrophe", bg: "bg-terra", text: "text-creme" },
} as const;

export function ProductCard({ product }: ProductCardProps) {
  const levelConfig = LEVEL_CONFIG[product.level as 1 | 2 | 3] ?? {
    label: "Inconnu",
    bg: "bg-gris",
    text: "text-creme",
  };

  return (
    <Link href={`/produit/${product.id}`} className="group block h-full">
      <article className="bg-creme border border-charbon/10 rounded overflow-hidden shadow-sm group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-200 h-full flex flex-col">
        {/* Level Badge */}
        <div
          className={`${levelConfig.bg} ${levelConfig.text} py-1.5 px-4 font-display text-sm tracking-widest text-center`}
        >
          {levelConfig.label}
        </div>

        {/* Image */}
        <div className="relative w-full h-48 bg-charbon/5 overflow-hidden">
          {product.imageUrl ? (
            <OptimizedImage
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-editorial italic text-gris text-sm">
              [{product.name}]
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <h3 className="font-display text-2xl tracking-wide text-charbon leading-tight">
            {product.name}
          </h3>
          <p className="font-editorial italic text-sm text-gris line-clamp-2 flex-1">
            {product.tagline}
          </p>
          <span className="font-ui font-semibold text-xs uppercase tracking-wider text-terra mt-1">
            Voir ce trou →
          </span>
        </div>
      </article>
    </Link>
  );
}
