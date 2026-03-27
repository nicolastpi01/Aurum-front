import { Typography, Stack, Card, CardContent, List, ListItem, ListItemText, CircularProgress, Alert, Button } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccounts } from "../services/accountsService";
import PropTypes from "prop-types";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);
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

    fetchAccounts();
  }, []);

  const handleViewMovements = (accountId) => {
    navigate(`/accounts/${accountId}/movements`);
  };

  if (loading) {
    return (
      <Stack spacing={2} data-cy='page-dashboard' alignItems="center">
        <Typography variant='h4'>Dashboard</Typography>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack spacing={2} data-cy='page-dashboard'>
        <Typography variant='h4'>Dashboard</Typography>
        <Alert severity="error">{error}</Alert>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} data-cy='page-dashboard'>
      <Typography variant='h4'>Dashboard</Typography>
      <Typography variant='body1'>Tus cuentas bancarias:</Typography>

      {accounts.length === 0 ? (
        <Typography>No tienes cuentas registradas.</Typography>
      ) : (
        <List>
          {accounts.map((account) => (
            <ListItem key={account.id}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ListItemText
                      primary={`Cuenta ID: ${account.id} - ${account.currency}`}
                      secondary={`Balance: $${account.balance} | Estado: ${account.status}`}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewMovements(account.id)}
                      data-cy={`btn-view-movements-${account.id}`}
                    >
                      Ver Movimientos
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
}

DashboardPage.propTypes = {
  // No props required - uses hooks for state and navigation
};
