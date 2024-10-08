import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Providers from "./utils/Provider";
import Modal from "./components/Modal";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

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
        <AppProvider>
          <Providers>
            <Header />
            <Modal />
            <Toaster position="top-center" />
            {children}
            <Footer />
          </Providers>
        </AppProvider>
      </body>
    </html>
  );
}
