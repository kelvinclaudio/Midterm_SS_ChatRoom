import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const switchMode = () => {
    setError("");
    setMode(mode === "login" ? "register" : "login");
    setEmail("");
    setPassword("");
    setConfirm("");
  };

  const handleSubmit = async () => {
    setError("");
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password !== confirm) {
          return setError("Passwords don't match");
        }
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4 rounded-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-2">
          {mode === "login" ? "Login here" : "Create Account"}
        </h3>
        <p className="text-center text-muted mb-4">
          {mode === "login"
            ? "Welcome back you've been missed!"
            : "Create an account so you can join the chat"}
        </p>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {mode === "register" && (
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        )}

        <button
          className="btn btn-danger w-100 rounded-pill mb-3"
          onClick={handleSubmit}
        >
          {mode === "login" ? "Sign in" : "Sign up"}
        </button>

        <div className="text-center">
          {mode === "login" ? (
            <>
              <small className="text-muted">Don't have an account?</small>{" "}
              <span
                className="text-danger fw-semibold"
                style={{ cursor: "pointer" }}
                onClick={switchMode}
              >
                Create one
              </span>
            </>
          ) : (
            <>
              <small className="text-muted">Already have an account?</small>{" "}
              <span
                className="text-danger fw-semibold"
                style={{ cursor: "pointer" }}
                onClick={switchMode}
              >
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
