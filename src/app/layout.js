import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
