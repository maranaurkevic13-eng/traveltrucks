import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css"; 
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast"; 
import { ToastContainer } from "react-toastify";

// Шрифти
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

// Метадані
export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Camper rental catalog",
  icons: {
    icon: "/favicon.svg", 
  },
  openGraph: {
    title: "TravelTrucks",
    url: "http://localhost:3000/",
    description: "Browse and book campers with TravelTrucks",
    images: [
      {
        url: "/favicon.png", 
        width: 1200,
        height: 630,
        alt: "TravelTrucks",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <TanStackProvider>
          <div className="appShell">
            <Header />
            <Toaster position="top-right" reverseOrder={false} />
            <main>{children}
              <ToastContainer position="top-right" autoClose={3000} />
            </main>
          </div>
          {/* <GlobalLoader /> */}
        </TanStackProvider>
      </body>
    </html>
  );
}
