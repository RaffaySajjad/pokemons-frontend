import Wrapper from "@/components/Wrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledJsxRegistry from "./registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokémons App",
  description: "A simple Pokémons app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledJsxRegistry>
          <Wrapper>{children}</Wrapper>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
