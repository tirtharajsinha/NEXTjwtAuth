"use client";

import "@/styles/globals.css";
import Nav from "@/components/Nav";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>NextJwtAuth</title>
        <link rel="icon" href="logo.svg" />
      </head>
      <body>
        <Provider store={store}>
          <Nav />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
