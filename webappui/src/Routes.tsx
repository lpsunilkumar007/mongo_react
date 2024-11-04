import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Logintest from "./Logintest";
import Register from "./Register";
import Home from "./pages/Home";
import ForgotPassword from "./ForgotPassword";
import Employee from "./pages/Employee";
import AdminLayout from "./AdminLayout";
import AuthGuard from "./AuthGuard";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <AdminLayout>
                <Home />
              </AdminLayout>
            </AuthGuard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logintest" element={<Logintest />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/employee"
          element={
            <AuthGuard>
              <AdminLayout>
                <Employee />
              </AdminLayout>
            </AuthGuard>
          }
        />
       
      </Routes>
    </>
  );
}

export default AppRoutes;