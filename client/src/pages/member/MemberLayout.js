import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import path from 'ultils/path';

const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user);
    if (!isLoggedIn || !current) {
        return <Navigate to={`/${path.LOGIN}`} replace={true} />
    }
    return (
        <div>
            <div>MemberLayout</div>
            <Outlet />
        </div>
    )
}

export default MemberLayout