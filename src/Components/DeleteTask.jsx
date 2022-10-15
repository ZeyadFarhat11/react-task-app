import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useGlobalContext } from "../context/context";
import { db } from "../firebase";
import Loading from "./Loading";

const DeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const { tasks } = useGlobalContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = e.target.id.value.trim();
    if (!id) return;
    await updateDoc(doc(db, "users", user.uid), {
      tasks: tasks.filter((e) => e.id !== id),
    });
    e.target.reset();
    setLoading(false);
  };
  return (
    <form className="customForm" onSubmit={handleSubmit}>
      {loading && <Loading />}
      <input type="text" placeholder="Task Id" name="id" required />
      <button type="submit" className="btn">
        submit
      </button>
    </form>
  );
};

export default DeleteTask;
