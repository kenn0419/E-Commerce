import { apiRemoveProductFromCart } from 'apis';
import SelectQuantity from 'components/Common/SelectQuantity';
import React, { memo, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';
import { formatMoney } from 'ultils/helper';

const OrderItem = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const handleRemove = async (pid) => {
        const response = await apiRemoveProductFromCart(pid);
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
    return (
        <div className='w-main mx-auto font-bold p-3 grid grid-cols-10 border border-gray-200'>
            <span className='col-span-6 w-full text-center'>
                <div className='flex gap-6'>
                    <img
                        src={item.thumbNail}
                        alt=''
                        className='w-48 h-48 object-cover cursor-pointer'
                        onClick={() => navigate(`/${item.product.category}/${item.product._id}/${item.product.title}`)}
                    />
                    <div className='flex flex-col items-start gap-3'>
                        <span className='font-bold text-red-500'>{item.title}</span>
                        <span className='uppercase text-sm font-main'>{item.color || 'BLACK'}</span>
                        <span onClick={() => handleRemove(item.product._id)} className='text-xs font-normal text-gray-500 cursor-pointer hover:text-red-500'>
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
            <span className='col-span-3 w-full flex justify-center items-center'>{formatMoney(item.price)}</span>
        </div>
    )
}

export default memo(OrderItem);