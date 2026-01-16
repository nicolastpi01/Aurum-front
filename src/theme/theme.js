import { createTheme } from "@mui/material/styles";

export function createAppTheme(mode) {
  return createTheme({
    palette: {
      mode,
    },
  });
}
