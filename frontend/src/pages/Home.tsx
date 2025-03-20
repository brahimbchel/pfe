import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

function Home() {
  const { user, isAuth, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear authentication state
    navigate("/auth/login"); // Redirect to login page
  };

  return (
    <div>
      <h1>Home Page</h1>
      {isAuth ? (
        <>
          <h2>Welcome, {user?.name}!, you are {user?.role}</h2>

          <h1>Welcom to PFE this is Home Page</h1>

          {user?.role === "admin" && (
            <Link to="/admin/" className={`flex items-center space-x-2 `}>
              <span>admin</span>
            </Link>
          )}

          {user?.role === "medcin" && (
            <Link to="/medcin/" className={`flex items-center space-x-2 `}>
              <span>medcin</span>
            </Link>
          )}

          {user?.role === "employer" && (
            <Link to="/employer/" className={`flex items-center space-x-2 `}>
              <span>employer</span>
            </Link>
          )}

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h1>Welcom to PFE this is Home Page</h1>
          <p>Please log in to continue.</p>
          <Link to="/auth/login" className={`flex items-center space-x-2 `}>
            <span>login</span>
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
