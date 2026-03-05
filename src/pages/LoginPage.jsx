import { Typography, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { setAccessToken } from "../auth/session";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {

    const data = { accessToken: "fake-token" };

    setAccessToken(data.accessToken);

    window.location.href = "/dashboard";

  } catch (error) {
    console.error(error);
  }
};

  return (
    <Stack spacing={2} data-cy="page-login" sx={{ maxWidth: 400 }}>
      <Typography variant="h4">Login</Typography>

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Stack>
  );
}