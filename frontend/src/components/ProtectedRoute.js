import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, isOwner }) => {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.userState
  );
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated) {
    if (isOwner === true && user.userType !== "owner") {
      return <Navigate to="/" />;
    }
    return children;
  }

  if (loading) {
    return <div>...Loading</div>;
  }
};
