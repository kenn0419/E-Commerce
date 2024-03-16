import React, { useEffect } from 'react'
import { OrderItem } from 'components';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { formatMoney } from 'ultils/helper';
import path from 'ultils/path';

const DetailCart = () => {
    const navigate = useNavigate();
    const { currentCart, isSuccess } = useSelector(state => state.user);
    useEffect(() => {
        if (isSuccess) {
            navigate(`/${path.HOME}`);
        }
    }, [isSuccess])
    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center w-full'>
                <div className='w-main'>
                    <h3 className='font-semibold tracking-tighter text-3xl pb-3 border-b border-red-500'>My Cart</h3>
                </div>
            </div>
            {currentCart ? <div className='my-8'>
                <div className='w-main mx-auto font-bold py-3 grid grid-cols-10 border border-gray-200 bg-gray-400 text-white'>
                    <span className='col-span-6 w-full text-center'></span>
                    <span className='col-span-1 w-full text-center'>Quantity</span>
                    <span className='col-span-3 w-full text-center'>Price</span>
                </div>
                {currentCart.map(item => (
                    <OrderItem
                        key={item._id}
                        item={item}
                        defaultQuantity={item.quantity}
                    />
                ))}
            </div> : <span className='text-3xl text-center text-main'>no products in the cart yet</span>}
            <div className='w-main mx-auto flex flex-col mb-12 items-end justify-center gap-3'>
                <span className='flex items-center gap-8 text-base'>
                    <span>Subtotal:</span>
                    <span className='text-red-500 opacity-80'>{formatMoney(currentCart.reduce((prev, value) => prev + value.price * value.quantity, 0))}</span>
                </span>
                <span className='block mt-3 text-center italic text-gray-600 font-medium'>Shipping, taxes, and discounts calculated at checkout.</span>
                <Link
                    target='_blank'
                    to={`/${path.CHECKOUT}`}
                    className='px-3 py-1 bg-main text-white hover:bg-red-800'
                >
                    Checkout
                </Link>
            </div>
        </div>
    )
}

export default DetailCart