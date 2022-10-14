import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const RequireUser = ({children}) => {

    const {user} = useAuthContext()

    
    if (!user) {
        return <Navigate to='/login' />
    }

    return children
}

export default RequireUser;
