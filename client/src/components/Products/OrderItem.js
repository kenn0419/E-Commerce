import { current } from '@reduxjs/toolkit';
import { apiRemoveProductFromCart } from 'apis';
import SelectQuantity from 'components/Common/SelectQuantity';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';
import { updateCart } from 'store/user/userSlice';
import { formatMoney } from 'ultils/helper';

const OrderItem = ({ item, defaultQuantity = 1 }) => {
    console.log(item);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(defaultQuantity);
    const handleRemove = async (pid, color) => {
        const response = await apiRemoveProductFromCart(pid, color);
        if (response.success) {
            toast.success(response.message);
            dispatch(getCurrent());
        } else {
            toast.error(response.message);
        }
    }
    const handleQuantiTy = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) return;
        setQuantity(number);
    }, [quantity])
    const handleChangeQuantity = useCallback((option) => {
        if (Number(quantity) === 1 && option === 'minus') {
            return;
        }
        if (option === 'minus') {
            setQuantity(prev => +prev - 1);

        } else {
            setQuantity(prev => +prev + 1);
        }
    }, [quantity])
    useEffect(() => {
        dispatch(updateCart({ pid: item.product._id, quantity, color: item.color }));
    }, [quantity])
    return (
        <div className='w-main mx-auto font-bold p-3 grid grid-cols-10 border border-gray-200'>
            <span className='col-span-6 w-full text-center'>
                <div className='flex gap-6 px-4 py-2'>
                    <img
                        src={item.thumbNail}
                        alt=''
                        className='w-48 h-48 object-cover cursor-pointer'
                        onClick={() => navigate(`/${item.product.category}/${item.product._id}/${item.product.title}`)}
                    />
                    <div className='flex flex-col items-start gap-3'>
                        <span className='font-bold text-red-500'>{item.title}</span>
                        <span className='uppercase text-sm font-main'>{item.color || 'BLACK'}</span>
                        <span onClick={() => handleRemove(item.product._id, item.color)} className='text-xs font-normal text-gray-500 cursor-pointer hover:text-red-500'>
                            Remove
                        </span>
                    </div>
                </div>
            </span>
            <span className='col-span-1 w-full flex justify-center items-center'>
                <SelectQuantity
                    isHiden
                    quantity={quantity}
                    handleQuantiTy={handleQuantiTy}
                    handleChangeQuantity={handleChangeQuantity}
                />
            </span>
            <span className='col-span-3 w-full flex justify-center items-center'>{formatMoney(item.price * quantity)}</span>
        </div>
    )
}

export default memo(OrderItem);