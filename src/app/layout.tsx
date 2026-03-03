import type { Metadata } from "next";
import { Cormorant_Garamond, Quicksand } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cormorant", 
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand", 
});

export const metadata: Metadata = {
  title: "Foodie. - Premium Delivery",
  description: "Experience the best food in town",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${quicksand.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}