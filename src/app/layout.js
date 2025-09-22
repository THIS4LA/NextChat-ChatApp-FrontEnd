"use client";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Provider } from "react-redux";
import { store } from "../../store/store";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${PlusJakartaSans.className} antialiased`}>
        <Navbar />
        <Provider store={store}>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
