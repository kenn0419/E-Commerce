import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import { showCart } from 'store/app/appSlice';
import icons from 'ultils/icon';

const Cart = () => {
    const dispatch = useDispatch();
    const { IoCloseOutline } = icons;
    return (
        <div
            onClick={e => e.stopPropagation()}
            className='w-[350px] max-h-screen overflow-y-auto text-white bg-black p-6'
        >
            <h2 className=' py-4 border-b border-gray-800 flex justify-between items-center font-semibold text-2xl'>
                <span>Your Cart</span>
                <span
                    onClick={() => dispatch(showCart())}
                    className='cursor-pointer hover:text-red-500'>
                    <IoCloseOutline size={24} />
                </span>
            </h2>
        </div>
    )
}

export default memo(Cart);