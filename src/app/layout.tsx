import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jourdan Hutagalung | Cybersecurity Specialist & Future Software Engineer",
  description: "Portofolio profesional Jourdan Hutagalung. Mahasiswa dengan minat mendalam pada Cybersecurity dan Software Engineering.",
  keywords: ["Jourdan Hutagalung", "Portofolio", "Cybersecurity", "Software Engineer", "Next.js", "3D"],
  authors: [{ name: "Jourdan Hutagalung" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-cyber-black text-white min-h-screen selection:bg-cyber-cyan selection:text-black`}
      >
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
