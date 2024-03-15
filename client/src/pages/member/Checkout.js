import React from 'react'
import shopping from 'assets/shopping.gif'
import { useSelector } from 'react-redux'
import { formatMoney } from 'ultils/helper';
import { Paypal } from 'components';


const Checkout = () => {
    const { currentCart } = useSelector(state => state.user);
    console.log(currentCart);
    return (
        <div className='w-full p-8 grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6'>
            <div className='w-full flex items-center justify-center col-span-4'>
                <img src={shopping} alt='' className='h-[80%] object-contain' />
            </div>
            <div className='flex flex-col justify-center items-center gap-6 col-span-6'>
                <h2 className='text-2xl mb-6 font-bold capitalize'>Checkout your order</h2>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='border bg-sky-500'>
                            <th className='text-center p-2 text-white'>#</th>
                            <th className='text-center p-2 text-white'>Products</th>
                            <th className='text-center p-2 text-white'>Color</th>
                            <th className='text-center p-2 text-white'>Quantity</th>
                            <th className='text-center p-2 text-white'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCart.map((item, index) => (
                            <tr key={item._id}>
                                <td className='text-center border'>{index + 1}</td>
                                <td className='text-left border'>{item.title}</td>
                                <td className='text-center border'>{item.color}</td>
                                <td className='text-center border'>{item.quantity}</td>
                                <td className='text-right border'>{formatMoney(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <span className='w-full flex justify-end items-center gap-8 text-base'>
                    <span>Subtotal:</span>
                    <span className='text-red-500 opacity-80'>{formatMoney(currentCart.reduce((prev, value) => prev + value.price * value.quantity, 0))}</span>
                </span>
                <div>
                    Input address
                </div>
                <div className='w-full'>
                    <Paypal amount={120} />
                </div>
            </div>
        </div>
    )
}

export default Checkout