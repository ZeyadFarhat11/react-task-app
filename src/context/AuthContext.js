import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useGlobalContext } from "./context";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { setTasks } = useGlobalContext();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log(`Auth State Change`, user);
      setUser(user);
      if (window.document.location.href.match(/login/)) {
        navigate("/", { replace: true });
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      const { tasks } = doc.data();
      setTasks(tasks);
      // console.log(`Doc Changed doc:`, doc.data());
    });

    return () => unsub();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
