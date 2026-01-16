import { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeModeContext } from "../theme/ThemeModeContext";

export default function ThemeToggleButton() {
  const { mode, toggleTheme } = useContext(ThemeModeContext);

  return (
    <Tooltip title={mode === "dark" ? "Modo claro" : "Modo oscuro"}>
      <IconButton color='inherit' onClick={toggleTheme} data-cy='theme-toggle'>
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
