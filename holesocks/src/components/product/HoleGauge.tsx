"use client";

import { motion } from "framer-motion";

interface HoleGaugeProps {
  gaugeValue: number; // 0-100
  level: 1 | 2 | 3;
}

const LEVEL_CONFIG = {
  1: { color: "bg-sauge", label: "Léger", labelColor: "text-sauge" },
  2: { color: "bg-ambre", label: "Aéré", labelColor: "text-ambre" },
  3: { color: "bg-terra", label: "Catastrophe", labelColor: "text-terra" },
} as const;

export function HoleGauge({ gaugeValue, level }: HoleGaugeProps) {
  const config = LEVEL_CONFIG[level] ?? { color: "bg-gris", label: "Inconnu", labelColor: "text-gris" };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-ui text-xs font-semibold uppercase tracking-wider text-gris">
          Niveau de trou
        </h3>
        <span className={`font-display text-xl tracking-wide ${config.labelColor}`}>
          {config.label}
        </span>
      </div>

      {/* Gauge Bar */}
      <div
        role="progressbar"
        aria-valuenow={gaugeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Niveau d'usure : ${gaugeValue}%`}
        className="relative w-full h-4 bg-charbon/10 rounded-full overflow-hidden"
      >
        <motion.div
          className={`h-full ${config.color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${gaugeValue}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between font-ui text-xs text-gris px-1">
        <span>Intact</span>
        <span>Modéré</span>
        <span>Critique</span>
      </div>
    </div>
  );
}
