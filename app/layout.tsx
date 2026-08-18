import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AMASSA. — Pão vivo, todo santo dia",
    template: "%s | AMASSA.",
  },
  description:
    "Padaria artesanal de fermentação lenta em São Paulo. Pães, croissants e café feitos sem atalhos.",
  keywords: [
    "padaria artesanal São Paulo",
    "pão de fermentação natural",
    "croissant artesanal",
    "padaria Vila Madalena",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AMASSA. — Pão vivo, todo santo dia",
    description: "Padaria de bairro. Pão sem atalhos.",
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "AMASSA",
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "AMASSA — Pão vivo, todo santo dia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMASSA. — Pão vivo, todo santo dia",
    description: "Padaria de bairro. Pão sem atalhos.",
    images: [`${SITE_URL}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
