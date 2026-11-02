// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";

import { BrowserRouter } from "react-router";
import { StrictMode, Suspense } from "react";
import { AuthProvider } from "./authentications/AuthContext.jsx";
import { PathProvider } from "./assets/PathContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense>
      <AuthProvider>
        <PathProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PathProvider>
      </AuthProvider>
    </Suspense>
  </StrictMode>,
);
