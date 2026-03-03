import { Typography, Stack } from "@mui/material";

export default function DashboardPage() {
  return (
    <Stack spacing={2} data-cy='page-dashboard'>
      <Typography variant='h4'>Dashboard</Typography>
      <Typography variant='body1'>Página base (MVP).</Typography>
    </Stack>
  );
}
