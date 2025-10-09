"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";


import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../store/store";

const PlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${PlusJakartaSans.className} antialiased`}>
        <Provider store={store}>
          {/* PersistGate waits until rehydration before rendering children */}
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
