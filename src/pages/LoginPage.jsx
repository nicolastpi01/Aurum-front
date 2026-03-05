import { Typography, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { setAccessToken } from "../auth/session";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {

      setError(null);

      // simulación login
      if (email === "test@test.com" && password === "1234") {

        const data = { accessToken: "fake-token" };

        setAccessToken(data.accessToken);

        window.location.href = "/dashboard";

      } else {

        setError("Invalid credentials");

      }

    } catch (error) {

      setError("Login failed");

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