import React, { useEffect } from 'react'
import { Button, OrderItem } from 'components';
import { useDispatch, useSelector } from 'react-redux'
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { formatMoney } from 'ultils/helper';
import path from 'ultils/path';
import Swal from 'sweetalert2';
import { getCurrent } from 'store/user/asyncAction';

const DetailCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { currentCart, isSuccess, current } = useSelector(state => state.user);
    useEffect(() => {
        if (isSuccess) {
            dispatch(getCurrent());
        }
    }, [isSuccess])
    const handleSubmit = () => {
        if (current.address.length === 0) {
            return Swal.fire({
                icon: 'info',
                title: 'Oopss!!!',
                text: 'Please provide your address before order these products',
                showCancelButton: true,
            }).then(res => {
                if (res.isConfirmed) {
                    navigate({
                        pathname: `/${path.MEMBER}/${path.PERSONAL}`,
                        search: createSearchParams({ redirect: location.pathname }).toString()
                    })
                }
            })
        } else {
            window.open(`/${path.CHECKOUT}`)
        }
    }
    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center w-full'>
                <div className='w-main'>
                    <h3 className='font-semibold tracking-tighter text-3xl pb-3 border-b border-red-500'>My Cart</h3>
                </div>
            </div>
            {currentCart.length > 0 ? <div className='my-8'>
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
            </div> : <span className='text-2xl text-center text-main p-6 capitalize'>no products in the cart yet</span>}
            <div className='w-main mx-auto flex flex-col mb-12 items-end justify-center gap-3'>
                <span className='flex items-center gap-8 text-base'>
                    <span>Subtotal:</span>
                    <span className='text-red-500 opacity-80'>{formatMoney(currentCart.reduce((prev, value) => prev + value.price * value.quantity, 0))}</span>
                </span>
                <span className='block mt-3 text-center italic text-gray-600 font-medium'>Shipping, taxes, and discounts calculated at checkout.</span>
                <Button handleOnClick={handleSubmit}>Checkout</Button>
            </div>
        </div>
    )
}

export default DetailCart