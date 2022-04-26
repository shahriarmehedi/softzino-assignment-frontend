import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    let location = useLocation();
    if (isLoading) {
        return <div className=" flex justify-center items-center py-72 bg-current">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-300"></div>
        </div>
    }
    if (user.email) {
        return children;
    }
    else {
        return <Navigate to="/login" state={{ from: location }} />
    }

};

export default PrivateRoute;