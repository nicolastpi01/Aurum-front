import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import App from "./App.jsx";
import ThemeModeProvider from "./theme/ThemeModeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeModeProvider>
      <CssBaseline />
      <App />
    </ThemeModeProvider>
  </StrictMode>
);
