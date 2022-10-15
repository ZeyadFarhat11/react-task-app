import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import Loading from "./Loading";

const Signup = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(
      `try to signup name: ${name}, email: ${email}, password: ${password}`
    );

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        await updateProfile(cred.user, {
          displayName: name || "Unknown",
        });
        await setDoc(doc(db, "users", cred.user.uid), {
          name,
          tasks: [],
          uid: cred.user.uid,
        });

        navigate("/", { replace: true });
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div className="formContainer">
      {loading && <Loading />}
      <div className="formWrapper">
        <h2>signup</h2>
        <div className="form-links">
          <NavLink to="/login">login</NavLink>
          <NavLink to="/signup">signup</NavLink>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" name="name" required />
          <input type="email" placeholder="email" name="email" required />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
          />
          {error && <p className="error">Please check inputs again</p>}
          <button type="submit" className="btn">
            signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
