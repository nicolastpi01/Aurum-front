import { Typography, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { setAccessToken } from "../auth/session";
import { login } from "../services/authService";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setError(null);
      const data = await login(email, password);
      setAccessToken(data.accessToken);
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.message);
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

      {error && (
        <Typography color="error">
          {error}
        </Typography>
      )}

    </Stack>
  );
}