import { doc,  updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useGlobalContext } from '../context/context';
import { db } from '../firebase';
import Loading from './Loading';

const AddTask = () => {
    const {user} = useAuthContext()
    const {tasks} = useGlobalContext()
    const [loading, setLoading ] = useState(false)

    const randomID = () => {
        return 'zxcvbnmasdfghjklpoiuytrewqZXCVBNMLKJHGFDSAPOIUYTREWQ0123456789'
        .split('').sort(() => Math.random() - .5).slice(0, 10).join('')
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        const title = e.target.title.value
        const size = e.target.size.value

        const docRef = doc(db, 'users', user.uid);
       await  updateDoc(docRef, {
            tasks: [...tasks, {title: title, size: size, done: 0, id: randomID()}]
        })

        setLoading(false)
        e.target.reset()
    }

    return (
        <form className='custom-form' onSubmit={handleSubmit}>
            {loading && <Loading />}
            <input type="text" placeholder='title' name='title' required />
            <input type="number" placeholder='size' name='size' required />
            <button type='submit'>submit</button>
        </form>
    );
}

export default AddTask;
