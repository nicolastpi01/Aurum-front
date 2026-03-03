import { Typography, Stack } from "@mui/material";

export default function LoginPage() {
  return (
    <Stack spacing={2} data-cy='page-login'>
      <Typography variant='h4'>Login</Typography>
      <Typography variant='body1'>Página base de login (MVP).</Typography>
    </Stack>
  );
}
