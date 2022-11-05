import React from "react";
import { useOutlet } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import Loading from "./Loading";
import Navbar from "./Navbar";
import TaskList from "./TaskList";

const Home = () => {
  const outlet = useOutlet();
  const { loading } = useGlobalContext();
  return (
    <>
      {loading ? <Loading /> : null}
      <Navbar />
      {outlet || <TaskList />}
    </>
  );
};

export default Home;
