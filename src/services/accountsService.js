import { getAccessToken } from "../auth/session";
import { handleApiError } from "../utils/httpUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAccounts() {
  const token = getAccessToken();
  if (!token) {
    throw new Error("No autenticado");
  }

  const response = await fetch(`${API_BASE_URL}/accounts`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    handleApiError(response);
  }

  return await response.json();
}

export async function getAccountMovements(accountId, page = 0, size = 10) {
  const token = getAccessToken();
  if (!token) {
    throw new Error("No autenticado");
  }

  const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/movements?page=${page}&size=${size}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    handleApiError(response);
  }

  return await response.json();
}