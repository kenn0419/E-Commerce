import React from 'react'
import { Breadcrumbs, Button, OrderItem } from 'components';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { formatMoney } from 'ultils/helper';

const DetailCart = () => {
    const location = useLocation();
    const { currentCart } = useSelector(state => state.user);
    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center w-full'>
                <div className='w-main'>
                    <h3 className='font-semibold tracking-tighter text-3xl'>My Cart</h3>
                    <Breadcrumbs title={location.pathname} />
                </div>
            </div>
            <div className='my-8'>
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
            </div>
            <div className='w-main mx-auto flex flex-col mb-12 items-end justify-center gap-3'>
                <span className='flex items-center gap-8 text-base'>
                    <span>Subtotal:</span>
                    <span className='text-red-500 opacity-80'>{formatMoney(currentCart.reduce((prev, value) => prev + value.price * value.quantity, 0))}</span>
                </span>
                <span className='block mt-3 text-center italic text-gray-600 font-medium'>Shipping, taxes, and discounts calculated at checkout.</span>
                <Button>Checkout</Button>
            </div>
        </div>
    )
}

export default DetailCart