import React, { memo } from 'react';
import { navigation } from 'ultils/contants';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='w-main h-[48px] py-2 border-y text-sm flex items-center'>
            {navigation.map(item => (
                <NavLink
                    to={item.path}
                    key={item.id}
                    className={({ isActive }) => isActive ? 'pr-12 hover:text-hover text-hover' : 'pr-12 hover:text-hover'}
                >
                    {item.value}
                </NavLink>
            ))
            }
        </div >
    )
}

export default memo(Navigation);