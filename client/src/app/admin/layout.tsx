import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
  keywords: "Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={plus_Jakarta_Sans.className}>{children}</main>;
}
