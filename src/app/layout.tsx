import type { Metadata } from "next";
import { Inter, Playfair_Display, Sarpanch } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const sarpanch = Sarpanch({
  variable: "--font-sarpanch",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Esknder Zinabie — Lead 3D Architectural Visualizer & CG Artist",
  description:
    "Esknder Zinabie — Lead 3D Architectural Visualizer with 6+ years of experience. Photorealistic 4K/8K imagery, cinematic walkthroughs, and real-time interactive tours. Based in Addis Ababa, available worldwide.",
  keywords: [
    "Esknder Zinabie",
    "architectural visualization",
    "archviz",
    "3D rendering",
    "CG artist",
    "walkthrough animation",
    "aerial animation",
    "Addis Ababa",
    "Ethiopia",
    "D5 Render",
    "Unreal Engine 5",
    "3ds Max",
    "Corona Renderer",
    "V-Ray",
  ],
  authors: [{ name: "Esknder Zinabie" }],
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg`,
  },
  openGraph: {
    title: "Esknder Zinabie — Lead 3D Architectural Visualizer & CG Artist",
    description:
      "Photorealistic 4K/8K imagery, cinematic walkthroughs, and real-time interactive tours. Based in Addis Ababa, available worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${sarpanch.variable} antialiased bg-neutral-950 text-white overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
