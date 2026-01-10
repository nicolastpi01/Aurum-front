import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "./theme";
import { ThemeModeContext } from "./ThemeModeContext";

const STORAGE_KEY = "aurum.theme";

export default function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "light"
  );

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.dataset.theme = mode; // para Cypress estable
  }, [mode]);

  const value = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
