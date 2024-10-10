import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      // console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      // console.error("Service Worker registration failed:", error);
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
