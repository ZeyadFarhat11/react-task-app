import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(`try to login email: ${email}, password: ${password}`);

    signInWithEmailAndPassword(auth, email, password).catch(() => {
      setError(true);
      setLoading(false);
    });
  };
  return (
    <div className="formContainer">
      {loading && <Loading />}
      <div className="formWrapper">
        <h2>login</h2>
        <div className="form-links">
          <NavLink to="/login">login</NavLink>
          <NavLink to="/signup">signup</NavLink>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" name="email" required />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
          />
          {error && (
            <p className="error">Please check email and password again</p>
          )}
          <button type="submit" className="btn">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
