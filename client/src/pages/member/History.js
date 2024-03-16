import { apiGetUserOrder } from 'apis'
import { CustomSelect, InputForm, Pagination } from 'components';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { formatMoney } from 'ultils/helper';
import { statusOrder } from 'ultils/contants';
import icons from 'ultils/icon';

const History = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { FaEdit, FaRegTrashAlt } = icons;
    const [params] = useSearchParams();
    const [orders, setOrders] = useState([]);
    const [count, setCount] = useState(0);
    const { register, formState: { errors }, watch, setValue } = useForm();
    const search = watch('search');
    const status = watch('status');
    const fetchApiOrders = async (params) => {
        const response = await apiGetUserOrder({ ...params, limit: process.env.REACT_APP_LIMIT });
        if (response.success) {
            setCount(response.counts);
            setOrders(response.orders);
        }
    }
    const handleSearchStatus = (data) => {
        setValue('status', data);
        if (data.value) {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({
                    status: data?.value
                }).toString()
            })
        } else {
            navigate(location.pathname);
        }
    }
    useEffect(() => {
        const param = Object.fromEntries([...params]);
        fetchApiOrders(param);
    }, [params])
    console.log(status);
    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-semibold px-4 border-b border-gray-400'>
                <span>History</span>
            </h1>
            <div className='flex items-center justify-end pr-4'>
                <form className='w-[60%] flex items-center gap-4'>
                    <div className='flex-1'>
                        <InputForm
                            id='search'
                            register={register}
                            errors={errors}
                            fullWidth
                            placeholder='Search orders with status or price,...'
                        />
                    </div>
                    <div className='flex-1'>
                        <CustomSelect
                            options={statusOrder}
                            value={status}
                            onChange={val => handleSearchStatus(val)}
                        />
                    </div>
                </form>
            </div >
            <div className='p-2 w-full'>
                <table className='table-auto w-full'>
                    <thead className='border border-white bg-sky-900 text-white'>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => (
                            <tr className='border-b border-gray-300' key={order._id}>
                                <td className='py-2 px-2'>{((params.get('page') > 1 ? params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT) + index + 1}</td>
                                <td className='py-2 px-5'>
                                    <span className='flex flex-col gap-2'>
                                        {order.products.map(item => (
                                            <span key={item._id} className='text-sm'>
                                                {`${item.title} - ${item.color}`}
                                            </span>
                                        ))}
                                    </span>
                                </td>
                                <td className='py-2 px-2 text-center'>{formatMoney(order.total)}</td>
                                <td className='py-2 px-2 text-center'>{order.status}</td>
                                <td className='py-2 px-2 text-center'>{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                                <td className='py-2 px-2'>
                                    <div className='flex gap-2 items-center justify-end'>
                                        <span
                                            className='cursor-pointer hover:underline hover:text-yellow-500 text-blue-500'
                                        >
                                            <FaEdit />
                                        </span>
                                        <span
                                            className='cursor-pointer hover:underline hover:text-red-500  text-blue-500'
                                        >
                                            <FaRegTrashAlt />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='w-full'>
                <Pagination totalCount={count} />
            </div>
        </div >
    )
}

export default History