import React, { useEffect } from 'react'
import shopping from 'assets/shopping.gif'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from 'ultils/helper';
import { Congratulation, Paypal } from 'components';
import { getCurrent } from 'store/user/asyncAction';


const Checkout = () => {
    const dispatch = useDispatch();
    const { currentCart, isSuccess, current } = useSelector(state => state.user);
    useEffect(() => {
        if (isSuccess) {
            dispatch(getCurrent());
        }
    }, [isSuccess])
    return (
        <div className='w-full p-8 grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6'>
            {isSuccess && <Congratulation />}
            <div className='w-full flex items-center justify-center col-span-4'>
                <img src={shopping} alt='' className='h-[80%] object-contain' />
            </div>
            <div className='flex flex-col justify-center gap-6 col-span-6'>
                <h2 className='text-2xl mb-6 font-bold capitalize'>Checkout your order</h2>
                <div className='flex gap-6'>
                    <div className='flex-1'>
                        <table className='table-auto flex-1 h-fit'>
                            <thead>
                                <tr className='border bg-sky-500'>
                                    <th className='text-center p-1 text-white'>Products</th>
                                    <th className='text-center p-1 text-white'>Color</th>
                                    <th className='text-center p-1 text-white'>Quantity</th>
                                    <th className='text-center p-1 text-white'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCart.map(item => (
                                    <tr key={item._id}>
                                        <td className='text-sm py-2 uppercase border'>{item.title}</td>
                                        <td className='text-sm py-2 uppercase border'>{item.color}</td>
                                        <td className='text-sm py-2 uppercase text-center border'>{item.quantity}</td>
                                        <td className='text-sm py-2 uppercase text-right border'>{formatMoney(item.price * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex-1 flex flex-col justify-between gap-[40px]'>
                        <span className='flex items-center gap-8 text-base'>
                            <span className='font-medium'>Subtotal:</span>
                            <span className='text-red-500 font-semibold opacity-80'>{formatMoney(currentCart.reduce((prev, value) => prev + value.price * value.quantity, 0))}</span>
                        </span>
                        <span className='flex items-center gap-8 text-base'>
                            <span className='font-medium'>Address:</span>
                            <span className='text-sky-400 font-semibold opacity-80'>{current.address}</span>
                        </span>
                        <div className='w-full'>
                            <Paypal
                                payload={{
                                    address: current.address,
                                    products: currentCart,
                                    total: currentCart.reduce((prev, value) => prev + value.price * value.quantity, 0),
                                }}
                                amount={Math.round(currentCart.reduce((prev, value) => prev + value.price * value.quantity, 0) / 24720)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout