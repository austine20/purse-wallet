import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import PublicRoutes from "./pages/PublicRoutes";
import Loader from "./pages/Loader";
import { useSelector } from "react-redux";
import Transaction from "./pages/Transaction/Transaction";

function App() {
  const { loading } = useSelector((state) => state.loading);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoutes>
                <Transaction />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
