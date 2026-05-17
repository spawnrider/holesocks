/**
 * Product Detail Page
 * Displays detailed product information
 * Uses Static Generation with generateStaticParams
 */

import Link from "next/link";
import { HoleGauge } from "@/components/product/HoleGauge";
import { BricoleurKit } from "@/components/kit/BricoleurKit";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { REVIEWS } from "@/data/reviews";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  const product = PRODUCTS.find((p) => p.id === id);
  
  if (!product) {
    notFound();
  }

  const productReviews = REVIEWS.filter((r) => r.productId === product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.level === product.level && p.id !== product.id
  ).slice(0, 3);

  // Render directly (server component) instead of using client component
  // This allows SSG to work correctly
  return (
    <div className="min-h-screen bg-creme pt-[72px]">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          href="/catalogue"
          className="font-ui font-semibold text-xs uppercase tracking-wider text-gris hover:text-charbon mb-8 inline-flex items-center gap-1 transition-colors"
        >
          ← Retour au catalogue
        </Link>

        {/* Product Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 mt-6">
          {/* Image */}
          <div className="relative w-full h-96 bg-charbon/5 rounded overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-editorial italic text-gris">
                [{product.name}]
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-5xl md:text-6xl tracking-wide text-charbon leading-none mb-2">
                {product.name}
              </h1>
              <p className="font-editorial italic text-xl text-gris">{product.tagline}</p>
            </div>

            {/* Gauge */}
            <HoleGauge gaugeValue={product.gaugeValue} level={product.level} />

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-ui font-bold text-xs uppercase tracking-widest text-gris mb-1">
                  Couleur
                </p>
                <p className="font-ui font-semibold text-charbon">
                  {product.color.charAt(0).toUpperCase() + product.color.slice(1)}
                </p>
              </div>
              <div>
                <p className="font-ui font-bold text-xs uppercase tracking-widest text-gris mb-1">
                  Style
                </p>
                <p className="font-ui font-semibold text-charbon">
                  {product.style.charAt(0).toUpperCase() + product.style.slice(1)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="font-ui font-bold text-xs uppercase tracking-widest text-gris mb-2">
                Description
              </p>
              <p className="font-editorial text-charbon/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <p className="font-ui font-bold text-xs uppercase tracking-widest text-gris mb-3">
                Tailles disponibles
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-charbon/30 font-ui font-semibold text-sm text-charbon rounded hover:bg-charbon hover:text-creme hover:border-charbon transition-colors min-h-[44px]"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button className="w-full bg-acidule text-charbon font-ui font-bold text-sm uppercase tracking-wider py-4 rounded hover:bg-charbon hover:text-creme transition-colors duration-150 min-h-[52px]">
              Adopter ce trou
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-charbon/10 pt-12 mb-12">
          <h2 className="font-display text-3xl tracking-wide text-charbon mb-6">
            Avis clients ({productReviews.length})
          </h2>
          <ReviewSection productId={product.id} initialReviews={productReviews} />
        </div>

        {/* Cross-Sell Section */}
        <div className="border-t border-charbon/10 pt-12">
          <BricoleurKit relatedProducts={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
