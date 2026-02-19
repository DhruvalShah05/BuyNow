// src/routes/RequireAdmin.js
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    // Not logged in → redirect to signin
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    // Logged in but not admin → redirect to home or show error
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
