import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | DBA, Cloud Architecture & Data Engineering`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#031C50",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-navy focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
