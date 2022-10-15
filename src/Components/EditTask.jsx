import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useGlobalContext } from "../context/context";
import { db } from "../firebase";
import Loading from "./Loading";

const EditTask = () => {
  const { user } = useAuthContext();
  const { tasks } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const formRef = React.createRef();

  const getInfo = () => {
    const id = formRef.current.id.value;
    if (!id) return;

    const task = tasks.find((e) => e.id === id);
    if (task === -1) return;
    formRef.current.title.value = task.title;
    formRef.current.size.value = task.size;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const id = e.target.id.value;
    const title = e.target.title.value;
    const size = e.target.size.value;

    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      tasks: tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, size };
        }
        return task;
      }),
    });

    setLoading(false);
    e.target.reset();
  };

  return (
    <form className="customForm" onSubmit={handleSubmit} ref={formRef}>
      {loading && <Loading />}
      <input
        type="text"
        placeholder="task id"
        name="id"
        required
        onInput={getInfo}
      />
      <input type="text" placeholder="title" name="title" required />
      <input type="number" placeholder="size" name="size" required />
      <button type="submit" className="btn">
        submit
      </button>
    </form>
  );
};

export default EditTask;
