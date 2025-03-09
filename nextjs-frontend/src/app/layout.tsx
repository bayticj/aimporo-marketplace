import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/style/css/header.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";

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
        <link href="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.css" rel="stylesheet" />
        {/* Preload critical assets */}
        <link rel="preload" href="/assets/img/aimporo-logo.png" as="image" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <SocketProvider>
            <Header />
            {children}
            <Footer />
          </SocketProvider>
        </AuthProvider>
        
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js" strategy="beforeInteractive" />
        
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
              
              if (typeof feather !== 'undefined') {
                feather.replace();
                console.log('Feather icons initialized');
              } else {
                console.error('Feather library not loaded properly');
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
