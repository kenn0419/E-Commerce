import React, { memo, Fragment, useState } from 'react'
import avatar from 'assets/avatar_default.png'
import { memberSidebar } from 'ultils/contants'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx';
import icons from 'ultils/icon';
import { useSelector } from 'react-redux';

const activeStyle = 'px-4 py-2 flex items-center gap-2 text-gray-900 bg-gray-400';
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 text-gray-900 hover:bg-gray-300';

const MemberSidebar = () => {
    const { current } = useSelector(state => state.user);
    const { IoIosArrowDown, MdOutlineKeyboardArrowRight } = icons;
    const [actived, setActived] = useState([]);
    const handleShowTab = (id) => {
        if (actived.some(item => item === id)) {
            setActived(prev => prev.filter(item => item !== id))
        } else {
            setActived(prev => [...prev, id]);
        }
    }
    return (
        <div className='bg-white h-full py-4'>
            <div className='w-full flex flex-col justify-center items-center gap-2'>
                <img src={current.avatar || avatar} alt='' className='w-[50px] object-cover' />
                <span>{`${current.lastname} ${current.firstname}`}</span>
            </div>
            <div>
                {memberSidebar.map(item => (
                    <Fragment key={item.id}>
                        {item.type === 'SINGLE' &&
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}>
                                <span><item.icon /></span>
                                <span>{item.text}</span>
                            </NavLink>}
                        {item.type === 'PARENT' &&
                            <div
                                className='flex text-gray-900 flex-col'
                                onClick={() => handleShowTab(item.id)}
                            >
                                <div className='flex items-center justify-between px-4 py-2 hover:bg-gray-3 00 cursor-pointer'>
                                    <div className='flex items-center gap-2'>
                                        <span><item.icon /></span>
                                        <span>{item.text}</span>
                                    </div>
                                    {actived.some(compo => compo === item.id) ? <MdOutlineKeyboardArrowRight size={20} /> : <IoIosArrowDown size={18} />}
                                </div>
                                {actived.some(compo => compo === item.id) &&
                                    <div className='flex flex-col text-sm'>
                                        {item.subMenu.map(el => (
                                            <NavLink
                                                to={el.path}
                                                key={el.text}
                                                onClick={e => e.stopPropagation()}
                                                className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle, 'pl-6')}
                                            >
                                                {el.text}
                                            </NavLink>))}
                                    </div>
                                }
                            </div>
                        }
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(MemberSidebar)