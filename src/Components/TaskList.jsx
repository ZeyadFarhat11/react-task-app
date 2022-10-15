import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { useGlobalContext } from "../context/context";

const Task = ({ title, size, done, id }) => {
  const boxesJSX = [];
  for (let i = 0; i < size; i++) {
    boxesJSX.push(
      <span className={`box${i <= done - 1 ? " active" : ""}`} key={i}></span>
    );
  }

  const copyId = () => {
    window.navigator.clipboard.writeText(id);
  };

  return (
    <div className="task">
      <h3>{title}</h3>
      <div className="boxes">{boxesJSX}</div>
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
