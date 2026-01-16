import { createContext } from "react";

export const ThemeModeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
});
