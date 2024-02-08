import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import path from 'ultils/path';

const AdminLayout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user);
    if (!isLoggedIn || +current?.role !== 0) {
        return <Navigate to={`/${path.LOGIN}`} replace={true} />
    }
    return (
        <div>
            <div>AdminLayout</div>
            <Outlet />
        </div>
    )
}

export default AdminLayout