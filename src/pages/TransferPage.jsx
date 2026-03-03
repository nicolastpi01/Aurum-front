import { Typography, Stack } from "@mui/material";

export default function TransferPage() {
  return (
    <Stack spacing={2} data-cy='page-transfer'>
      <Typography variant='h4'>Transfer</Typography>
      <Typography variant='body1'>
        Página base de transferencias (MVP).
      </Typography>
    </Stack>
  );
}
