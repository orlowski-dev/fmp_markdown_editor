import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "@/assets/styles/globals.css";

const roboto = Roboto({
  subsets: ["latin-ext"],
  weight: ["300", "400", "700"],
  variable: "--roboto",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
  variable: "--roboto-slab",
});

export const metadata: Metadata = {
  title: "Markdown Editor",
  description: "Generated by create next app",
  icons: ["/favicon-32x32.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoSlab.variable}`}>
        {children}
      </body>
    </html>
  );
}
