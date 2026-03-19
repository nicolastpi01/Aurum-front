/**
 * Maneja errores de respuestas HTTP de la API
 * @param {Response} response - La respuesta fetch
 * @throws {Error} Error con mensaje apropiado según status code
 */
export function handleApiError(response) {
  switch (response.status) {
    case 400:
      throw new Error("Solicitud inválida");
    case 401:
      throw new Error("401"); // Para redirección en el componente
    case 403:
      throw new Error("403"); // Acceso denegado
    case 404:
      throw new Error("Recurso no encontrado");
    case 422:
      throw new Error("Datos inválidos");
    case 500:
      throw new Error("Error interno del servidor");
    default:
      throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}