import React, { memo } from 'react'
import icons from '../ultils/icon'

const Footer = () => {
    const { MdEmail, MdLocationOn, FaPhoneAlt } = icons;
    return (
        <div className='w-full mt-10'>
            <div className='w-full flex justify-center items-center flex-col h-[103px] bg-hover'>
                <div className='w-main flex justify-between'>
                    <div>
                        <h3 className='text-white text-[20px]'>SIGN UP TO NEWSLETTER</h3>
                        <span className='text-white opacity-60 text-[13px]'>Subscribe now and receive weekly newsletter</span>
                    </div>
                    <div className='w-1/2 flex items-center'>
                        <input placeholder='Email address'
                            className='bg-[#f04646] w-full h-[50px] pl-5 rounded-l-full 
                            outline-none text-white placeholder:text-[#f9afaf]'

                        />
                        <div className='h-[50px] w-[56px] bg-[#f04646] rounded-r-full flex items-center'>
                            <MdEmail color='white' size={20} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[407px] bg-[#191919] flex justify-center text-white text-[13px]'>
                <div className='w-main flex mt-10'>
                    <div className='flex-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-[4px] border-hover pl-[15px]'>About us</h3>
                        <span className='flex gap-2 items-center mt-4'>
                            <span className='flex items-center gap-2'><MdLocationOn color='white' size={15} /> Address:</span>
                            <span className='text-gray-400'>474 Ontario St Toronto, ON M4X 1M7 Canada</span>
                        </span>
                        <span className='flex gap-2 items-center mt-4'>
                            <span className='flex items-center gap-2'><FaPhoneAlt color='white' size={15} /> Phone:</span>
                            <span className='text-gray-400'>(+1234)56789xxx</span>
                        </span>
                        <span className='flex gap-2 items-center mt-4'>
                            <span className='flex items-center gap-2'><MdEmail color='white' size={15} /> Mail:</span>
                            <span className='text-gray-400'>tadathemes@gmail.com</span>
                        </span>
                    </div>
                    <div className='flex-1'>
                        <h3 className=' text-[15px] font-medium border-l-[4px] border-hover pl-[15px]'>Information</h3>
                        <span className='flex flex-col'>
                            <span className='mt-4 text-gray-400'>Typography</span>
                            <span className='mt-4 text-gray-400'>Gallery</span>
                            <span className='mt-4 text-gray-400'>Store Location</span>
                            <span className='mt-4 text-gray-400'>Today's Deals</span>
                            <span className='mt-4 text-gray-400'>Contact</span>
                        </span>
                    </div>
                    <div className='flex-1'>
                        <h3 className=' text-[15px] font-medium border-l-[4px] border-hover pl-[15px]'>WHO WE ARE</h3>
                        <span className='flex flex-col'>
                            <span className='mt-4 text-gray-400'>Help</span>
                            <span className='mt-4 text-gray-400'>Free Shipping</span>
                            <span className='mt-4 text-gray-400'>FAQs</span>
                            <span className='mt-4 text-gray-400'>Return & Exchange</span>
                            <span className='mt-4 text-gray-400'>Testimonials</span>
                        </span>
                    </div>
                    <div className='flex-1'>
                        <h3 className=' text-[15px] font-medium border-l-[4px] border-hover pl-[15px]'>#DIGITALWORLDSTORE</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Footer)