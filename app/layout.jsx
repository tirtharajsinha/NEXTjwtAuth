"use client";

import "@/styles/globals.css";
import Nav from "@/components/Nav";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Nav />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
