import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Prompt from "@/components/Prompt";
import Container from "@/components/Container";
import ThemeSelector from "@/components/ThemeSelector";
import SideMenu from "@/components/SideMenu";
import ToastContainer from "./ToastContainer";

export const metadata: Metadata = {
  title: {
    default: "Shahram Roohani",
    template: "%s | Shahram Roohani",
  },
  description: "Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hidden font-sans antialiased">
      <body className="relative h-full w-full sm:w-[80%] max-w-[800px] m-auto">
        <Container>
          <div className="w-full flex justify-start items-center">
            <ToastContainer classes="sm:hidden" />
            <Header />
          </div>
          <hr className="w-full" />
          <div className="w-full flex justify-start items-center">
            <Prompt username="me" hostname="here" />
            <ToastContainer classes="hidden sm:flex" />
          </div>
          <hr className="w-full" />
          <Main>{children}</Main>
          <Footer />
        </Container>
        <ThemeSelector />
        <SideMenu />
      </body>
    </html>
  );
}
