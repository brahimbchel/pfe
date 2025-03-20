import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router";

function Login() {
  const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !role) {
      alert("Please enter your name and password.");
      return;
    }

    // Dummy authentication
    const user = { name, email: `${name}@example.com`, role: role };
    const token = "dummy-token-123";

    login(user, token); // Store user data in Zustand

    navigate("/"); // Redirect to home page
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        {/* <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br /> */}

        <br />
        <label>
          Role: [admin, medcin, employer]
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </label>
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;