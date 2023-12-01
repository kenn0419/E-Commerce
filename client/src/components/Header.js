import React from 'react';
import logo from '../assets/logo.png';
import icons from '../ultils/icon';
import { Link } from 'react-router-dom';
import path from '../ultils/path';
const Header = () => {
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
                <div className='flex items-center gap-2 justify-center px-5 border-r'>
                    <IoBagSharp color='red' />
                    <span>0 item</span>
                </div>
                <div className='flex items-center px-5'>
                    <FaUser size={20} />
                </div>
            </div>
        </div>
    )
}

export default Header