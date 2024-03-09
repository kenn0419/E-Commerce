import { MemberSidebar } from 'components';
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
        <div className='flex w-full bg-gray-100 min-h-screen relative text-gray-900'>
            <div className='w-[250px] flex-none fixed top-0 bottom-0'>
                <MemberSidebar />
            </div>
            <div className='w-[250px]'></div>
            <div className='flex-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default MemberLayout