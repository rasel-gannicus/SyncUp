import type { Metadata } from "next";
import "./globals.css";
import { Wrapper } from "@/components/Shared/Wrapper";
import { Ubuntu } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/Redux/Wrapper/ReduxProvider";
import { AuthWrapper } from "@/components/Shared/AuthWrapper";

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
    <ReduxProvider>
      <html lang="en">
        <body className={`${ubuntu.className} antialiased`}>
          <AuthWrapper>
            <Wrapper> {children} </Wrapper>
          </AuthWrapper>
          <Toaster position="bottom-center" />
        </body>
      </html>
    </ReduxProvider>
  );
}
