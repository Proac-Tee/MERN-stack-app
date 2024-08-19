import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Zhen Groups",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
