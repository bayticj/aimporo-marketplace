import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIMporo Marketplace",
  description: "Find the perfect digital service for your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="beforeInteractive" />
        
        <Script id="aos-init">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              if (typeof AOS !== 'undefined') {
                AOS.init({
                  duration: 800,
                  easing: 'ease-in-out',
                  once: true,
                  mirror: false
                });
                console.log('AOS initialized from layout');
              } else {
                console.error('AOS library not loaded properly');
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
