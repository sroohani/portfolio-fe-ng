import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Prompt from "@/components/Prompt";
import Container from "@/components/Container";
import ThemeSelector from "@/components/ThemeSelector";
import SideMenu from "@/components/SideMenu";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    default: "Shahram Roohani",
    template: "%s | Shahram Roohani",
  },
  description: "Portfolio",
};

// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hidden font-sans antialiased">
      <body className="relative h-full w-full sm:w-[80%] max-w-[800px] m-auto">
        <Container>
          <Header />
          <Prompt username="me" hostname="here" />
          <Main>{children}</Main>
          <Footer />
        </Container>
        <ThemeSelector />
        <SideMenu />
      </body>
    </html>
  );
}
