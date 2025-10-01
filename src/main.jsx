import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global loading overlay provider
import { LoadingProvider } from "./context/LoadingContext";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 👈 import default styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <App />
      {/* 👇 Toast container should be inside provider but outside App */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored" // 👈 optional (light, dark, colored)
      />
    </LoadingProvider>
  </React.StrictMode>
);
