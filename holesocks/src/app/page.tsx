import Link from "next/link";
import { PRODUCTS } from "@/data/products";

const levelProducts = [1, 2, 3].map((level) =>
  PRODUCTS.find((p) => p.level === level)
);

const LEVEL_CONFIG = [
  { bg: "bg-sauge", text: "text-creme", label: "Léger" },
  { bg: "bg-ambre", text: "text-charbon", label: "Aéré" },
  { bg: "bg-terra", text: "text-creme", label: "Catastrophe" },
];

export default function Home() {
  return (
    <div className="bg-creme">
      {/* HERO — Direction C : Épurée Centrée */}
      <section className="min-h-screen bg-charbon flex flex-col items-center justify-center text-center px-6 pt-[72px]">
        <p className="font-ui font-semibold text-xs uppercase tracking-[0.3em] text-acidule mb-6">
          La chaussette réinventée
        </p>
        <h1 className="font-display text-[clamp(4rem,14vw,10rem)] leading-none tracking-wide text-creme mb-6">
          HOLESOCKS
        </h1>
        <p className="font-editorial italic text-xl md:text-2xl text-creme/70 max-w-xl mb-10">
          Parce que c'est pas un bug, c'est une feature.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/catalogue"
            className="px-8 py-4 bg-acidule text-charbon font-ui font-bold text-sm uppercase tracking-wider rounded hover:bg-creme transition-colors duration-150 min-h-[52px] flex items-center"
          >
            Explorer la collection
          </Link>
          <Link
            href="/catalogue"
            className="px-8 py-4 border border-creme/30 text-creme font-ui font-semibold text-sm uppercase tracking-wider rounded hover:border-creme transition-colors duration-150 min-h-[52px] flex items-center"
          >
            Notre manifeste
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-ui text-xs uppercase tracking-widest text-creme">Défiler</span>
          <div className="w-px h-8 bg-creme/50" />
        </div>
      </section>

      {/* TROIS NIVEAUX */}
      <section className="py-24 px-6 bg-creme" aria-label="Les trois niveaux">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl md:text-5xl tracking-wide text-charbon mb-3">
              CHOISISSEZ VOTRE NIVEAU
            </h2>
            <p className="font-editorial italic text-gris text-lg">
              Du léger frisson au désastre assumé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levelProducts.map((product, idx) =>
              product ? (
                <Link
                  key={product.id}
                  href={`/produit/${product.id}`}
                  className="group block"
                >
                  <article className="bg-creme border border-charbon/10 rounded overflow-hidden h-full flex flex-col group-hover:-translate-y-1 group-hover:shadow-lg transition-all duration-200">
                    <div className={`${LEVEL_CONFIG[idx].bg} ${LEVEL_CONFIG[idx].text} py-2 font-display text-lg tracking-widest text-center`}>
                      {LEVEL_CONFIG[idx].label}
                    </div>
                    <div className="p-6 flex flex-col flex-1 gap-3">
                      <h3 className="font-display text-3xl tracking-wide text-charbon">
                        {product.name}
                      </h3>
                      <p className="font-editorial italic text-gris text-sm flex-1">
                        {product.tagline}
                      </p>
                      <span className="font-ui font-semibold text-xs uppercase tracking-wider text-terra">
                        Adopter ce trou →
                      </span>
                    </div>
                  </article>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* MANIFESTE — section nocturne */}
      <section className="py-24 px-6 bg-charbon" aria-label="Manifeste">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-creme">
          <div>
            <p className="font-display text-5xl text-acidule mb-4">01</p>
            <h3 className="font-display text-2xl tracking-wide mb-3">QUALITÉ VOLONTAIRE</h3>
            <p className="font-editorial italic text-creme/60 leading-relaxed">
              Fabriquées avec les meilleurs matériaux. Les trous, eux, sont certifiés artisanaux.
            </p>
          </div>
          <div>
            <p className="font-display text-5xl text-acidule mb-4">02</p>
            <h3 className="font-display text-2xl tracking-wide mb-3">TROIS NIVEAUX</h3>
            <p className="font-editorial italic text-creme/60 leading-relaxed">
              Du léger amateur au catastrophe professionnel. Votre niveau vous attend.
            </p>
          </div>
          <div>
            <p className="font-display text-5xl text-acidule mb-4">03</p>
            <h3 className="font-display text-2xl tracking-wide mb-3">HUMOUR INCLUS</h3>
            <p className="font-editorial italic text-creme/60 leading-relaxed">
              Chaque paire vient avec une garantie de sourires et de questions bizarres.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 bg-creme text-center" aria-label="Appel à l'action">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl tracking-wide text-charbon mb-4">
            PRÊT À RÉVOLUTIONNER VOS PIEDS ?
          </h2>
          <p className="font-editorial italic text-gris text-lg mb-8">
            La collection complète vous attend. Aucune excuse.
          </p>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-3 px-10 py-4 bg-charbon text-creme font-ui font-bold text-sm uppercase tracking-wider rounded hover:bg-terra transition-colors duration-150 min-h-[52px]"
          >
            Voir toute la collection →
          </Link>
        </div>
      </section>
    </div>
  );
}
