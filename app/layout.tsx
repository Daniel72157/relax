import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import WhatsappChatbot from "@/components/WhatsappChatbot";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"]
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://relaxvr360monteria.vercel.app"),
  title: "Relax VR 360° Montería | Centro de Relajación, Masajes y Realidad Virtual",
  description:
    "Descubre Relax VR 360° en Montería, Córdoba. Experiencias multisensoriales que integran masajes relajantes, piedras volcánicas, aromaterapia botánica doTERRA y Realidad Virtual 360°. Reserva tu momento de desconexión.",
  keywords: [
    "centro de relajación Montería",
    "masajes relajantes Montería",
    "bienestar Córdoba",
    "realidad virtual 360",
    "bienestar empresarial",
    "pausas activas",
    "aromaterapia doTERRA",
    "Relax Gold",
    "Relax Ritual"
  ],
  openGraph: {
    title: "Relax VR 360° Montería | Centro de Relajación & Bienestar",
    description:
      "Pausas conscientes y experiencias de relajación inmersiva en Montería. Masajes relajantes, piedras volcánicas, aromaterapia doTERRA CPTG y entornos VR 360°.",
    locale: "es_CO",
    type: "website"
  },
  icons: {
    icon: "/images/logolimpio.png?v=2",
    shortcut: "/images/logolimpio.png?v=2",
    apple: "/images/logolimpio.png?v=2"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${fraunces.variable} ${workSans.variable} font-body`}>
        {children}
        <WhatsappChatbot />
      </body>
    </html>
  );
}
