import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalLoader from "@/components/GlobalLoader";
import { Inter, Outfit, Oswald } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: {
    default: "Corredor Biológico Bosque Las Madres",
    template: "%s - Corredor Biológico Bosque Las Madres",
  },
  description:
    "Corredor Biológico Bosque Las Madres, Limón: conservación, conteo de aves 2024, galería de especies y cómo cuidar la naturaleza.",
  keywords: [
    "corredor biológico",
    "aves",
    "conservación",
    "biodiversidad",
    "Costa Rica",
    "Limón",
  ],
  authors: [{ name: "Corredor Biológico Bosque Las Madres" }],
};

export const viewport = {
  themeColor: "#1e6a6d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${outfit.variable} ${oswald.variable}`}>
      <body>
        <GlobalLoader />
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
