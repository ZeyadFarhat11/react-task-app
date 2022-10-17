import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useGlobalContext } from "../context/context";
import { useAuthContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Task = ({ title, id }) => {
  const { user } = useAuthContext();
  const { tasks } = useGlobalContext();
  const docRef = doc(db, "users", user.uid);

  tasks.splice();

  const up = () => {
    const taskIdx = tasks.findIndex((task) => task.id === id);
    if (taskIdx === 0) return;
    let tasksClone = [...tasks];
    [tasksClone[taskIdx], tasksClone[taskIdx - 1]] = [
      tasksClone[taskIdx - 1],
      tasksClone[taskIdx],
    ];

    updateDoc(docRef, {
      tasks: tasksClone,
    });
  };
  const down = () => {
    const taskIdx = tasks.findIndex((task) => task.id === id);
    if (taskIdx === tasks.length - 1) return;
    let tasksClone = [...tasks];
    [tasksClone[taskIdx], tasksClone[taskIdx + 1]] = [
      tasksClone[taskIdx + 1],
      tasksClone[taskIdx],
    ];

    updateDoc(docRef, {
      tasks: tasksClone,
    });
  };

  return (
    <div className="task">
      <h3>{title}</h3>
      <div className="tools">
        <button type="button" onClick={down}>
          <FaArrowDown />
        </button>
        <button type="button" onClick={up}>
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

const SortTasks = () => {
  const { tasks } = useGlobalContext();

  return (
    <div className="sort-tasks">
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};

export default SortTasks;
