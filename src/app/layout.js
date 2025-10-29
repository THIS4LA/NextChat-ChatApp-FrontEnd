"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../store/store";
import SocketProvider from "./providers/SocketProvider";
import { SkeletonTheme } from "react-loading-skeleton";

const PlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <body className={`${PlusJakartaSans.className} antialiased`}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SocketProvider>{children}</SocketProvider>
            </PersistGate>
          </Provider>
        </body>
      </SkeletonTheme>
    </html>
  );
}
