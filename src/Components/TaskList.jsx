import React from 'react';
import { useGlobalContext } from '../context/context';

const Task = ({title, size, done}) => {
    return <div className="task">
        <p>title: {title}</p>
        <p>size: {size}</p>
        <p>done: {done}</p>
    </div>
}

const TaskList = () => {
const {tasks} = useGlobalContext()
if (!tasks) {
    return <></>
}
    return <div className="taskList">
        {
            tasks.map(task => <Task key={task.id} {...task}/>)
        }
    </div>
}



export default TaskList;
