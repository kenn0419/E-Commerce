import { memo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import path from 'ultils/path';
import { getCurrent } from 'store/user/asyncAction';
import { useDispatch, useSelector } from 'react-redux'
import icons from 'ultils/icon';
import { clearMessage, logout } from 'store/user/userSlice';
import Swal from 'sweetalert2';

const TopHeader = () => {
    const { FiLogOut } = icons;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, current, message } = useSelector(state => state.user)
    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            if (dispatch && isLoggedIn) {
                dispatch(getCurrent())
            }
        }, 500);
        return () => {
            clearTimeout(setTimeoutId);
        }
    }, [dispatch, isLoggedIn])
    useEffect(() => {
        if (message) {
            Swal.fire({
                showCancelButton: true,
                confirmButtonText: 'Login',
                title: 'Oops!!!',
                icon: 'info',
                text: 'Login session has expired. Please login again'
            }).then((res) => {
                if (res.isConfirmed) {
                    dispatch(clearMessage());
                    navigate(`${path.LOGIN}`);
                }
            })
        }
    }, [message])
    return (
        <div className='h-[38px] w-full bg-hover flex items-center justify-center'>
            <div className='w-main flex justify-between items-center text-xs text-white'>
                <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                {isLoggedIn && current ?
                    <div className='flex items-center gap-2'>
                        <h4>{`Welcome, ${current?.firstname} ${current?.lastname}`}</h4>
                        {/* <span
                            className='cursor-pointer hover:rounded-full hover:bg-gray-200 p-2 hover:text-black'
                            onClick={() => dispatch(logout())}
                        >
                            <FiLogOut size={18} />
                        </span> */}
                    </div> :
                    <Link to={`/${path.LOGIN}`} className='hover:text-black'>Sign In or Create Account</Link>}
            </div>
        </div>
    )
}

export default memo(TopHeader)