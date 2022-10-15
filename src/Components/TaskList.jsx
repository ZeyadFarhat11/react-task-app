import { updateDoc, doc } from "firebase/firestore";
import React, { createRef, useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import { useGlobalContext } from "../context/context";
import { db } from "../firebase";

const Task = ({ title, size, done, id }) => {
  const { user } = useAuthContext();
  const { tasks } = useGlobalContext();
  const boxesRef = createRef();

  const handleClick = (e) => {
    if (
      (e.target.previousElementSibling?.classList.contains("active") ||
        !e.target.previousElementSibling) &&
      !e.target.nextElementSibling?.classList.contains("active")
    ) {
      e.target.classList.toggle("active");
    } else {
      return;
    }

    const completed = boxesRef.current.querySelectorAll(".box.active").length;
    updateDoc(doc(db, "users", user.uid), {
      tasks: tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: completed };
        }
        return task;
      }),
    });
  };

  const boxesJSX = [];
  for (let i = 0; i < size; i++) {
    boxesJSX.push(
      <span
        className={`box${i <= done - 1 ? " active" : ""}`}
        onClick={handleClick}
        key={i}
      ></span>
    );
  }

  const copyId = () => {
    window.navigator.clipboard.writeText(id);
  };

  return (
    <div className="task">
      <h3>{title}</h3>
      <div className="boxes" ref={boxesRef}>
        {boxesJSX}
      </div>
      <button type="button" className="copy" onClick={copyId}>
        <FaRegCopy />
      </button>
    </div>
  );
};

const TaskList = () => {
  const { tasks } = useGlobalContext();
  if (!tasks) {
    return <></>;
  }
  return (
    <div className="taskList">
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
};

export default TaskList;
