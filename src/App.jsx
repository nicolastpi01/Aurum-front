import { Typography, Button, Stack } from "@mui/material";
import AppShell from "./components/AppShell.jsx";
import ThemeToggleButton from "./components/ThemeToggleButton.jsx";

function App() {
  return (
    <AppShell rightSlot={<ThemeToggleButton />}>
      <Stack spacing={2}>
        <Typography variant='h4'>Aurum</Typography>
        <Typography>
          MUI listo. Esto valida CssBaseline, ThemeProvider y componentes base.
        </Typography>
        <Button variant='contained'>Botón de prueba</Button>
      </Stack>
    </AppShell>
  );
}

export default App;
