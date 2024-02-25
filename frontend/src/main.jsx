import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//error boundary
// import { ErrorBoundary } from "react-error-boundary";
// function fallBackRender({ error, resetErrorBoundary }) {
//   console.log(error);
//   resetErrorBoundary();
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* //   <ErrorBoundary fallback={fallBackRender}> */}
    <App />
    {/* </ErrorBoundary> */}

    <ToastContainer position='top-center' />
  </React.StrictMode>
);
