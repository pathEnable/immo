import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavbar from "@/components/BottomNavbar";
import SessionProvider from "@/components/SessionProvider";

// Fallback font stack to bypass network timeout during build
const outfit = {
  variable: "font-sans",
};

export const metadata: Metadata = {
  title: "IMMO | Plateforme Immobilière Africaine de Confiance",
  description: "Louez, gérez et sécurisez vos biens immobiliers en Afrique. La plateforme de confiance pour locataires et propriétaires.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${outfit.variable} antialiased flex flex-col min-h-screen`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
