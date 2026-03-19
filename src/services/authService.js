import { handleApiError } from "../utils/httpUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Credenciales incorrectas");
    }
    handleApiError(response);
  }

  return await response.json();
}