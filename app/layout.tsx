import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import clsx from "clsx";

import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.homeTitle,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.homeTitle,
    siteName: siteConfig.name,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [
      {
        url: new URL("/images/tridhara-radha-krishna-mandir.png", siteConfig.url).toString(),
        width: 1400,
        height: 980,
        alt: "Tridhara Milan Mandir courtyard and shikhara"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.homeTitle,
    description: siteConfig.description,
    images: [new URL("/images/tridhara-radha-krishna-mandir.png", siteConfig.url).toString()]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "text-neutral-900 antialiased",
          jakarta.variable,
          playfair.variable,
          "min-h-screen"
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
