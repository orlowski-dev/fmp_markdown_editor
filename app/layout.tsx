import type { Metadata } from "next";
import { Roboto, Roboto_Slab, Roboto_Mono } from "next/font/google";
import "@/assets/styles/globals.css";
import { CustomThemeProvider } from "./providers";

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

const robotoMono = Roboto_Mono({
  subsets: ["latin-ext"],
  weight: ["400"],
  variable: "--roboto-mono",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${robotoSlab.variable} ${robotoMono.variable}`}
      >
        <CustomThemeProvider> {children}</CustomThemeProvider>
      </body>
    </html>
  );
}
