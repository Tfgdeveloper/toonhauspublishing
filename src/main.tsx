import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import LeadModalProvider from "./component/LeadModal/LeadModalProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LeadModalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </LeadModalProvider>
  </StrictMode>
);