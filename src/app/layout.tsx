import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oneofushood.com"),
  title: "ONE OF US | $ONE",
  description: "NOT JUST A PHRASE. IT'S THE CULTURE. High risks. Big laughs. You belong here. Join the ONE OF US ($ONE) community.",
  applicationName: "ONE OF US",
  authors: [{ name: "ONE OF US Community", url: "https://x.com/ONEofUshood" }],
  generator: "Next.js",
  keywords: ["ONE OF US", "ONE", "memecoin", "crypto", "Solana", "WallStreetBets", "WSB", "culture", "community", "loss porn"],
  creator: "ONE OF US Team",
  publisher: "ONE OF US",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://oneofushood.com",
  },
  openGraph: {
    title: "ONE OF US | $ONE",
    description: "NOT JUST A PHRASE. IT'S THE CULTURE. High risks. Big laughs. You belong here. Join the ONE OF US ($ONE) community.",
    url: "https://x.com/ONEofUshood",
    siteName: "ONE OF US",
    images: [
      {
        url: "/hero-bg.png",
        width: 1920,
        height: 1080,
        alt: "ONE OF US | $ONE Community Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ONE OF US | $ONE",
    description: "NOT JUST A PHRASE. IT'S THE CULTURE. High risks. Big laughs. You belong here. Join the ONE OF US ($ONE) community.",
    images: ["/hero-bg.png"],
    creator: "@ONEofUshood",
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased bg-zinc-950 text-zinc-50 selection:bg-orange-500 selection:text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Script
          src="https://cdn.zanderio.ai/widget/loader.js"
          data-id="wdg_duzWH01PM7HlpxAOvQrFJbcA"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
