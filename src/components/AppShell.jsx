import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";

export default function AppShell({ title = "Aurum", children }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, bgcolor: "background.default" }}>
        <Container maxWidth='md'>
          <Box sx={{ py: 3 }}>{children}</Box>
        </Container>
      </Box>
    </Box>
  );
}
