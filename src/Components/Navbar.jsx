import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";
const Navbar = () => {
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <div className="container">
        <button type="button" className="toggler">
          <FaBars />
        </button>
        <nav>
          <Link to="/">home</Link>
          <Link to="/add-task">add task</Link>
          <Link to="/delete-task">delete task</Link>
          <Link to="/edit-task">edit task</Link>
        </nav>
        <button onClick={() => signOut(auth)} className="logout">
          logout
        </button>
        {/* <h3>Hello {user.displayName.split(' ')[0]}</h3> */}
      </div>
    </div>
  );
};

export default Navbar;
