import { apiRemoveProductFromCart } from 'apis';
import Button from 'components/Button/Button';
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { showCart } from 'store/app/appSlice';
import { getCurrent } from 'store/user/asyncAction';
import { formatMoney } from 'ultils/helper';
import icons from 'ultils/icon';
import path from 'ultils/path';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { IoCloseOutline, FaRegTrashAlt } = icons;
    const { currentCart } = useSelector(state => state.user);
    const handleRemove = async (pid, color) => {
        const response = await apiRemoveProductFromCart(pid, color);
        if (response.success) {
            toast.success(response.message);
            dispatch(getCurrent());
        } else {
            toast.error(response.message);
        }
    }
    return (
        <div
            onClick={e => e.stopPropagation()}
            className='w-[400px] h-screen text-white grid grid-rows-10 bg-black p-6'
        >
            <h2 className='row-span-1 h-full border-b border-gray-800 flex justify-between items-center font-semibold text-2xl'>
                <span>Your Cart</span>
                <span
                    onClick={() => dispatch(showCart())}
                    className='cursor-pointer hover:text-red-500'>
                    <IoCloseOutline size={24} />
                </span>
            </h2>
            <section className='row-span-7 flex flex-col gap-5 h-full max-h-full overflow-y-auto py-6'>
                {!currentCart.length === 0 && <span>Your Cart is Empty</span>}
                {currentCart?.map(item => (
                    <div key={item._id} className='flex gap-3 relative'>
                        <img src={item.thumbNail} alt='' className='w-16 h-16 object-cover' />
                        <div className='flex flex-col gap-1 w-full'>
                            <span className='font-bold'>{item.title}</span>
                            <span className='uppercase text-sm'>{item.color || 'BLACK'}</span>
                            <span className='text-sm'>{`Quantity: ${item.quantity}`}</span>
                            <span className='text-sm text-right'>{formatMoney(item.price * item.quantity)}</span>
                        </div>
                        <span
                            onClick={() => handleRemove(item.product._id, item.color)}
                            className='absolute top-0 right-4 cursor-pointer p-2 hover:bg-gray-300 rounded-full'>
                            <FaRegTrashAlt size={12} color='red' />
                        </span>
                    </div>
                ))}
            </section>
            <div className='row-span-2 flex flex-col justify-between h-full mt-1 pt-2 border-t border-gray-700'>
                <div className='flex justify-between items-center'>
                    <span className='uppercase text-base font-semibold'>SubTotal:</span>
                    <span className='uppercase text-base font-semibold'>{formatMoney(currentCart.reduce((prev, value) => prev + value.price * value.quantity, 0))}</span>
                </div>
                <span className='block mt-3 text-center italic text-gray-600 font-medium'>Shipping, taxes, and discounts calculated at checkout.</span>
                <Button fw handleOnClick={() => {
                    dispatch(showCart());
                    navigate(`/${path.MEMBER}/${path.MY_CART}`);
                }}>
                    SHOPPING CART
                </Button>
            </div>
        </div>
    )
}

export default memo(Cart);