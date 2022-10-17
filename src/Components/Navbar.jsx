import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import Loading from "./Loading";
const Navbar = () => {
  const { user } = useAuthContext();
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const clear = async () => {
    setMenu(false);
    if (!window.confirm()) return;
    setLoading(true);

    await updateDoc(doc(db, "users", user.uid), {
      tasks: [],
    });

    setLoading(false);
  };

  return (
    <div className="navbar">
      {loading && <Loading />}
      <div className="container">
        <button
          type="button"
          className="toggler"
          onClick={() => setMenu((m) => !m)}
        >
          <FaBars />
        </button>
        <ul className={`menu${menu ? " active" : ""}`}>
          <li onClick={clear}>clear tasks</li>
          <li>toggle mode</li>
        </ul>
        {menu && <div className="layer" onClick={() => setMenu(false)}></div>}
        <nav>
          <NavLink end to="/">
            home
          </NavLink>
          <NavLink to="/add">add task</NavLink>
          <NavLink to="/delete">delete task</NavLink>
          <NavLink to="/edit">edit task</NavLink>
          <NavLink to="/sort">sort tasks</NavLink>
          <NavLink to="/tables">tables</NavLink>
        </nav>
        <button onClick={() => signOut(auth)} className="logout">
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
