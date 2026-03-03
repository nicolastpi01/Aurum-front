import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import ThemeToggleButton from "../components/ThemeToggleButton.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import TransferPage from "../pages/TransferPage.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import { isAuthenticated } from "../auth/session.js";

function AppLayout({ children }) {
  return <AppShell rightSlot={<ThemeToggleButton />}>{children}</AppShell>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route
          path='/'
          element={
            <Navigate
              to={isAuthenticated() ? "/dashboard" : "/login"}
              replace
            />
          }
        />

        {/* Public */}
        <Route
          path='/login'
          element={
            <AppLayout>
              <LoginPage />
            </AppLayout>
          }
        />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route
            path='/dashboard'
            element={
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            }
          />
          <Route
            path='/transfer'
            element={
              <AppLayout>
                <TransferPage />
              </AppLayout>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
