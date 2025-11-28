import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RentalCar App",
  description:
    "RentalCar — online car rental service. Quick search for cars by brand, price and mileage.",
  icons: {
    icon: {
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
  },
  openGraph: {
    title: "RentalCar App",
    description:
      "RentalCar — online car rental service. Quick search for cars by brand, price and mileage.",
    url: "https://localhost:3000",
    images: [
      {
        url: "/images/banner.jpg",
        width: 1440,
        height: 700,
        alt: "RentalCar — online car rental service.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <Header />
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
