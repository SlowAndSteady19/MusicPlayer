import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Invalid credentials. Try again or sign up.");
    }
  };

  return (
    <div className="auth-container">
      <h1>Login into Melody Player</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="  Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="  Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button
  type="button"
  onClick={() => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Sign-in Error:", error);
        alert("Google Sign-in failed");
      });
  }}
>
  Sign in with Google
</button>
    <p>
    Don't have an account?{" "}
    <span onClick={() => navigate("/signup")}>Sign up</span>
    </p>
    </div>
  );
}

export default Login;
