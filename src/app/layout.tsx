import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Wrapper } from "@/components/Shared/Navbar/Wrapper";
import { Inter, Josefin_Sans, Poppins, Ubuntu } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Daily Apps",
  description: "Created by Shafiqul Hasan Rasel",
};

export const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} antialiased`}>
        <Wrapper children={children} />
      </body>
    </html>
  );
}
