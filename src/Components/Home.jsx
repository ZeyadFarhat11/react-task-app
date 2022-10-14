import React from 'react';
import {  useOutlet } from 'react-router-dom';
import AddTask from './AddTask';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';
import Navbar from './Navbar';
import TaskList from './TaskList';

const Home = () => {
    const outlet = useOutlet()
    return (
        <>
        <Navbar />
        {outlet || <TaskList />}
        </>
    );
}

export default Home;
