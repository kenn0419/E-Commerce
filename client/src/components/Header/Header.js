import React, { memo } from 'react';
import logo from 'assets/logo.png';
import icons from 'ultils/icon';
import { Link } from 'react-router-dom';
import path from 'ultils/path';
import { useSelector } from 'react-redux';
const Header = () => {
    const { current, isLoggedIn } = useSelector(state => state.user);
    const { FaPhoneAlt, MdEmail, FaUser, IoBagSharp } = icons;
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
                    <div className='flex items-center gap-2 justify-center px-5 border-r cursor-pointer'>
                        <IoBagSharp color='red' size={18} />
                        <span>0 item</span>
                    </div>
                    <Link
                        className='flex justify-center items-center px-5 gap-1 hover:underline cursor-pointer'
                        to={+current?.role === 0 ? `/${path.ADMIN}/${path.DASHBOARD}` : `/${path.MEMBER}/${path.PERSONAL}`}
                    >
                        <FaUser size={18} />
                        <span>Profile</span>
                    </Link>
                </>}
            </div>
        </div>
    )
}

export default memo(Header);