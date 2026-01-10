import { Typography, Button, Stack } from "@mui/material";
import AppShell from "./components/AppShell.jsx";

function App() {
  return (
    <AppShell>
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
