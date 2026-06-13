import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import VerifyOTP from "../pages/auth/VerifyOTP";
import StudentDashboard from "../pages/student/StudentDashboard";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import VoteGuard from "../components/shared/VoteGuard";
import VotePage from "../pages/student/VotePage";
import ReviewVotes from "../pages/student/ReviewVotes";
import Receipt from "../pages/student/Receipt";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route
          path="/student/review"
          element={
            <ProtectedRoute>
              <VoteGuard>
                <ReviewVotes />
              </VoteGuard>
            </ProtectedRoute>
          }
        />
        <Route path="/student/receipt" element={<Receipt />}/>
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }

        />
        <Route
          path="/student/vote"
          element={
            <ProtectedRoute>
              <VoteGuard>
              <VotePage />
              </VoteGuard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;