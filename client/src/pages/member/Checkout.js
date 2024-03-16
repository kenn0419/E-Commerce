import React from 'react'
import shopping from 'assets/shopping.gif'
import { useSelector } from 'react-redux'
import { formatMoney } from 'ultils/helper';
import { InputForm, Paypal } from 'components';
import { useForm } from 'react-hook-form';


const Checkout = () => {
    const { currentCart } = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    return (
        <div className='w-full p-8 grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6'>
            <div className='w-full flex items-center justify-center col-span-4'>
                <img src={shopping} alt='' className='h-[80%] object-contain' />
            </div>
            <div className='flex flex-col justify-center gap-6 col-span-6'>
                <h2 className='text-2xl mb-6 font-bold capitalize'>Checkout your order</h2>
                <div className='flex gap-6'>
                    <table className='table-auto flex-1'>
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
                                    <td className='text-[13px] border'>{item.title}</td>
                                    <td className='text-[13px] border'>{item.color}</td>
                                    <td className='text-[13px] text-center border'>{item.quantity}</td>
                                    <td className='text-[13px] text-right border'>{formatMoney(item.price * item.quantity)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex-1 flex flex-col justify-between gap-[45px]'>
                        <span className='flex items-center gap-8 text-base'>
                            <span className='font-medium'>Subtotal:</span>
                            <span className='text-red-500 font-semibold opacity-80'>{formatMoney(currentCart.reduce((prev, value) => prev + value.price * value.quantity, 0))}</span>
                        </span>
                        <InputForm
                            label='Address'
                            register={register}
                            errors={errors}
                            id='address'
                            validate={{
                                required: 'Require fill this field',
                            }}
                            style={`text-sm`}
                            fullWidth
                            placeholder='Your address....'
                        />
                        <div className='w-full'>
                            <Paypal amount={Math.round(currentCart.reduce((prev, value) => prev + value.price * value.quantity, 0) / 24720)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout