import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function VoteGuard({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center text-slate-700">Loading...</div>
      </div>
    );
  }

  if (user.has_voted === 1) {
    return <Navigate to="/student/receipt" replace />;
  }

  return children;
}

export default VoteGuard;
