import type { Metadata } from "next";
import { Bebas_Neue, DM_Serif_Display, Syne } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "HoleSocks — Les chaussettes trouées pour bricoleurs audacieux",
  description:
    "Parce que c'est pas un bug, c'est une feature. Découvrez notre collection unique de chaussettes conçues pour laisser respirer vos pieds... littéralement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bebasNeue.variable} ${dmSerifDisplay.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Skip to content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-acidule focus:text-charbon focus:font-ui focus:font-bold focus:text-sm focus:rounded"
        >
          Aller au contenu principal
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
