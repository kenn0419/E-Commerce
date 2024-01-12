import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from '../ultils/path';
import { getCurrent } from '../store/user/asyncAction';
import { useDispatch, useSelector } from 'react-redux'
import icons from '../ultils/icon';
import { logout } from '../store/user/userSlice';

const TopHeader = () => {
    const { FiLogOut } = icons
    const dispatch = useDispatch();
    const { isLoggedIn, current } = useSelector(state => state.user)
    useEffect(() => {
        if (dispatch) {
            setTimeout(() => {
                dispatch(getCurrent());
            }, 500);
        }
    }, [dispatch, isLoggedIn])
    return (
        <div className='h-[38px] w-full bg-hover flex items-center justify-center'>
            <div className='w-main flex justify-between items-center text-xs text-white'>
                <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                {isLoggedIn ?
                    <div className='flex items-center gap-2'>
                        <h4>{`Welcome, ${current?.firstname} ${current?.lastname}`}</h4>
                        <span
                            className='cursor-pointer hover:rounded-full hover:bg-gray-200 p-2 hover:text-black'
                            onClick={() => dispatch(logout())}
                        >
                            <FiLogOut size={18} />
                        </span>
                    </div> :
                    <Link to={`/${path.LOGIN}`} className='hover:text-black'>Sign In or Create Account</Link>}
            </div>
        </div>
    )
}

export default memo(TopHeader)