import { apiRemoveProductFromCart } from 'apis';
import { Breadcrumbs, Button, SelectQuantity } from 'components';
import React, { useCallback, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';
import { formatMoney } from 'ultils/helper';

const DetailCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { current } = useSelector(state => state.user);
    const location = useLocation();
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
                {current.cart.map(item => (
                    <div key={item._id} className='w-main mx-auto font-bold p-3 grid grid-cols-10 border border-gray-200'>
                        <span className='col-span-6 w-full text-center'>
                            <div className='flex gap-6'>
                                <img
                                    src={item.product.thumb}
                                    alt=''
                                    className='w-48 h-48 object-cover cursor-pointer'
                                    onClick={() => navigate(`/${item.product.category}/${item.product._id}/${item.product.title}`)}
                                />
                                <div className='flex flex-col items-start gap-3'>
                                    <span className='font-bold text-red-500'>{item.product.title}</span>
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
                        <span className='col-span-3 w-full flex justify-center items-center'>{formatMoney(item.product.price)}</span>
                    </div>
                ))}
            </div>
            <div className='w-main mx-auto flex flex-col mb-12 items-end justify-center gap-3'>
                <span className='flex items-center gap-8 text-base'>
                    <span>Subtotal:</span>
                    <span className='text-red-500 opacity-80'>{formatMoney(current.cart.reduce((prev, value) => prev + value.product.price, 0))}</span>
                </span>
                <span className='block mt-3 text-center italic text-gray-600 font-medium'>Shipping, taxes, and discounts calculated at checkout.</span>
                <Button>Checkout</Button>
            </div>
        </div>
    )
}

export default DetailCart