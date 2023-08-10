import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from "react-router-dom"

function RequireAuth() {

    const { user } = useSelector(state => state.user);
    const location = useLocation();

    return (
        user
            ? <Outlet />
            : <Navigate to={"/login"} state={{from: location}} replace />
    )
}

export default RequireAuth