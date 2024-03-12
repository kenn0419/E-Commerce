import React, { memo, useEffect, useState } from 'react';
import logo from 'assets/logo.png';
import icons from 'ultils/icon';
import { Link } from 'react-router-dom';
import path from 'ultils/path';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/user/userSlice';
import { showCart } from 'store/app/appSlice';
const Header = () => {
    const dispatch = useDispatch();
    const { current, isLoggedIn } = useSelector(state => state.user);
    const { FaPhoneAlt, MdEmail, FaUser, IoBagSharp } = icons;
    const [options, setOptions] = useState(false);
    const handleClickOutOption = (e) => {
        const profile = document.querySelector('#profile');
        if (!profile?.contains(e.target)) {
            setOptions(false);
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutOption);
        return () => {
            document.removeEventListener('click', handleClickOutOption);
        }
    }, [])
    return (
        <div className='w-main h-[110px] py-[35px] flex justify-between'>
            <Link to={`${path.HOME}`}>
                <img src={logo} alt="logo" className='w-[234px] object-contain' />
            </Link>
            <div className='flex text-[13px]'>
                <div className='flex flex-col items-center px-5 border-r'>
                    <span className='flex gap-4 items-center'>
                        <FaPhoneAlt color='red' />
                        <span className='font-semibold'>(+1800) 000 8808</span>
                    </span>
                    <span className='font-light'>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className='flex flex-col items-center px-5 border-r'>
                    <span className='flex gap-4 items-center'>
                        <MdEmail color='red' />
                        <span className='font-semibold'>SUPPORT@TADATHEMES.COM</span>
                    </span>
                    <span className='font-light'>Online Support 24/7</span>
                </div>
                {current && isLoggedIn && <>
                    <div
                        onClick={() => dispatch(showCart())}
                        className='flex items-center gap-2 justify-center px-5 border-r cursor-pointer hover:underline'
                    >
                        <IoBagSharp color='red' size={18} />
                        <span>{current.cart.length || 0} item(s)</span>
                    </div>
                    <div
                        className='flex justify-center items-center px-5 gap-1 hover:underline cursor-pointer relative'
                        onClick={() => setOptions(prev => !prev)}
                        id='profile'
                    >
                        <FaUser size={18} />
                        <span>Profile</span>
                        {options && <div onClick={e => e.stopPropagation()} className='absolute top-full left-4 border bg-white border-gray-300 min-w-[150px]'>
                            <Link className='p-2 border-b block hover:bg-sky-100 w-full' to={`/${path.MEMBER}/${path.PERSONAL}`}>Personal</Link>
                            {+current.role === 0 && <Link to={`/${path.ADMIN}/${path.DASHBOARD}`} className='p-2 border-b block hover:bg-sky-100 w-full'>Admin WorkSpace</Link>}
                            <span className='p-2 block hover:bg-sky-100 w-full' onClick={() => dispatch(logout())}>Logout</span>
                        </div>}
                    </div>
                </>}
            </div>
        </div>
    )
}

export default memo(Header);