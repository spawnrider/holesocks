/**
 * Manifeste Page
 * Explique le pourquoi de HoleSocks et présente le concept en détail
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre manifeste — HoleSocks",
  description:
    "Pourquoi on vend des chaussettes trouées, par design. Le manifeste HoleSocks : le pourquoi, les trois niveaux, et la promesse d'une marque qui assume.",
};

const LEVEL_CONFIG = [
  {
    bg: "bg-sauge",
    text: "text-creme",
    label: "Léger",
    description: "Un discret frisson d'air. On appelle ça la respiration, pas un trou.",
  },
  {
    bg: "bg-ambre",
    text: "text-charbon",
    label: "Aéré",
    description: "Ventilation assumée. Idéal pour les chaudes journées de déni.",
  },
  {
    bg: "bg-terra",
    text: "text-creme",
    label: "Catastrophe",
    description: "Le trou qui questionne vos choix de vie. Livré avec un mot de soutien.",
  },
];

export default function ManifestePage() {
  return (
    <div className="bg-creme">
      {/* ACCROCHE */}
      <section
        className="bg-charbon flex flex-col items-center justify-center text-center px-6 py-24 pt-[calc(72px+6rem)]"
        aria-label="Accroche du manifeste"
      >
        <p className="font-ui font-semibold text-xs uppercase tracking-[0.3em] text-acidule mb-6">
          Notre manifeste
        </p>
        <h1 className="font-display text-[clamp(3rem,10vw,7rem)] leading-none tracking-wide text-creme mb-6">
          POURQUOI DES TROUS ?
        </h1>
        <p className="font-editorial italic text-xl md:text-2xl text-creme/70 max-w-2xl">
          Parce que c&rsquo;est pas un bug, c&rsquo;est une feature.
        </p>
      </section>

      {/* LE POURQUOI */}
      <section className="py-24 px-6 bg-creme" aria-label="Le pourquoi de HoleSocks">
        <div className="max-w-[720px] mx-auto space-y-6">
          <h2 className="font-display text-4xl md:text-5xl tracking-wide text-charbon mb-6">
            L&rsquo;INÉVITABLE, EN MIEUX
          </h2>
          <p className="font-ui text-lg text-charbon leading-relaxed">
            Toutes les chaussettes finissent trouées. C&rsquo;est une loi physique, pas un
            accident. Le talon frotte, le gros orteil pousse, et un beau matin vous
            découvrez la vérité en pleine réunion. Nous, on a juste décidé d&rsquo;arrêter de
            prétendre le contraire.
          </p>
          <p className="font-ui text-lg text-charbon leading-relaxed">
            Plutôt que de vendre l&rsquo;illusion d&rsquo;une chaussette éternelle, on vend
            l&rsquo;usure assumée, dès le premier jour. Pas de mauvaise surprise au bout de
            trois lavages : le trou est déjà là, certifié artisanal, prêt à l&rsquo;emploi.
          </p>
          <p className="font-ui text-lg text-charbon leading-relaxed">
            On ne vend pas des chaussettes abîmées. On vend de l&rsquo;avant-garde
            confortable — avec le sourire, et sans aucune honte.
          </p>
        </div>
      </section>

      {/* LE CONCEPT EN DÉTAIL — 3 piliers, cohérence avec la home */}
      <section
        className="py-24 px-6 bg-charbon"
        aria-label="Le concept HoleSocks en détail"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl md:text-5xl tracking-wide text-creme mb-3">
              LE CONCEPT, EN DÉTAIL
            </h2>
            <p className="font-editorial italic text-creme/60 text-lg">
              Trois piliers. Zéro excuse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-creme mb-16">
            <div>
              <p className="font-display text-5xl text-acidule mb-4">01</p>
              <h3 className="font-display text-2xl tracking-wide mb-3">QUALITÉ VOLONTAIRE</h3>
              <p className="font-editorial italic text-creme/60 leading-relaxed">
                Fabriquées avec les meilleurs matériaux. Les trous, eux, sont certifiés
                artisanaux.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEVEL_CONFIG.map((level) => (
              <div
                key={level.label}
                className="bg-creme border border-creme/10 rounded overflow-hidden"
              >
                <div
                  className={`${level.bg} ${level.text} py-2 font-display text-lg tracking-widest text-center`}
                >
                  {level.label}
                </div>
                <p className="p-6 font-editorial italic text-gris text-sm leading-relaxed">
                  {level.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 bg-creme text-center" aria-label="Appel à l'action">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl tracking-wide text-charbon mb-4">
            ASSEZ LU. ADOPTEZ UN TROU.
          </h2>
          <p className="font-editorial italic text-gris text-lg mb-8">
            La collection complète vous attend. Aucune excuse.
          </p>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-3 px-10 py-4 bg-charbon text-creme font-ui font-bold text-sm uppercase tracking-wider rounded hover:bg-terra transition-colors duration-150 min-h-[52px]"
          >
            Explorer la collection →
          </Link>
        </div>
      </section>
    </div>
  );
}
