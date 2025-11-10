import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import Router from "./Routes/Router.jsx";
import ThemeProvider from "./Providers/ThemeProvider.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={Router} />
      </ThemeProvider>
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
