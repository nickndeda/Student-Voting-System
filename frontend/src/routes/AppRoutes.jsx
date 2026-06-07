import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import VerifyOTP from "../pages/auth/VerifyOTP";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;