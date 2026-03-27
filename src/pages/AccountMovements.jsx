import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Stack
} from "@mui/material";
import { getAccountMovements } from "../services/accountsService";

export default function AccountMovements() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0
  });

  const fetchMovements = async (page = 0) => {
    try {
      setLoading(true);
      const data = await getAccountMovements(id, page, pagination.size);
      setMovements(data.content || []);
      setPagination({
        page: data.number || 0,
        size: data.size || 10,
        totalPages: data.totalPages || 0,
        totalElements: data.totalElements || 0
      });
    } catch (err) {
      if (err.message === "401") {
        setError("Sesión expirada");
        window.location.href = "/login";
        return;
      }
      if (err.message === "403") {
        setError("Acceso denegado");
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, [id]);

  const handlePrevious = () => {
    if (pagination.page > 0) {
      fetchMovements(pagination.page - 1);
    }
  };

  const handleNext = () => {
    if (pagination.page < pagination.totalPages - 1) {
      fetchMovements(pagination.page + 1);
    }
  };

  if (loading) {
    return (
      <Box data-cy="page-account-movements" sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Movimientos de Cuenta
        </Typography>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box data-cy="page-account-movements" sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Movimientos de Cuenta
        </Typography>
        <Alert severity="error">{error}</Alert>
        <Button onClick={() => navigate("/dashboard")} sx={{ mt: 2 }}>
          Volver al Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box data-cy="page-account-movements" sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4">
          Movimientos de Cuenta #{id}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          Total: {pagination.totalElements} movimientos
        </Typography>

        {movements.length === 0 ? (
          <Alert severity="info">
            No hay movimientos para esta cuenta.
          </Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Moneda</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Balance Posterior</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>{movement.id}</TableCell>
                    <TableCell>{movement.entryType}</TableCell>
                    <TableCell>${movement.amount}</TableCell>
                    <TableCell>{movement.currency}</TableCell>
                    <TableCell>{movement.description}</TableCell>
                    <TableCell>${movement.balanceAfter}</TableCell>
                    <TableCell>
                      {new Date(movement.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={pagination.page === 0}
            data-cy="btn-previous"
          >
            Anterior
          </Button>
          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={pagination.page >= pagination.totalPages - 1}
            data-cy="btn-next"
          >
            Siguiente
          </Button>
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            Página {pagination.page + 1} de {pagination.totalPages || 1}
          </Typography>
        </Stack>

        <Button
          variant="text"
          onClick={() => navigate("/dashboard")}
          sx={{ mt: 2 }}
        >
          Volver al Dashboard
        </Button>
      </Stack>
    </Box>
  );
}

AccountMovements.propTypes = {
  // No props required - uses useParams and useNavigate hooks
};
