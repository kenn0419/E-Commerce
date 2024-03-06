import { apiDeleteProduct, apiGetProducts } from 'apis';
import { InputForm, Pagination } from 'components'
import useDebounce from 'hooks/useDebounce';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { formatMoney } from 'ultils/helper';
import UpdateProduct from './UpdateProduct';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ManageProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const { register, formState: { errors }, watch } = useForm();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [editProduct, setEditProduct] = useState();
    const [updated, setUpdated] = useState(false);
    const reRender = useCallback(() => {
        setUpdated(!updated);
    }, [])
    const fetchApiProducts = async (params) => {
        const response = await apiGetProducts({ ...params, limit: process.env.REACT_APP_LIMIT });
        if (response.success) {
            setProducts(response.products);
            setCount(response.counts);
        }
    }
    const queriesDebounce = useDebounce(watch('search'), 500)
    useEffect(() => {
        if (queriesDebounce) {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({ search: queriesDebounce }).toString()
            })
        } else {
            navigate(location.pathname);
        }
    }, [queriesDebounce])
    useEffect(() => {
        const searchParam = Object.fromEntries([...params]);
        fetchApiProducts(searchParam);

    }, [params, updated])
    const handleDelete = (pid) => {
        Swal.fire({
            title: 'Delete User',
            text: 'Are you sure to delete this product',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'gray'
        }).then(async (res) => {
            if (res.isConfirmed) {
                const response = await apiDeleteProduct(pid);
                if (response.success) {
                    toast.success(response.message);
                    reRender();
                } else {
                    toast.error(response.message);
                }
            }
        })
    }
    return (
        <div className='w-full flex flex-col gap-4 relative'>
            {editProduct && <div className='absolute inset-0 bg-gray-100 min-h-screen z-50'>
                <UpdateProduct
                    editProduct={editProduct}
                    reRender={reRender}
                    setEditProduct={setEditProduct}
                />
            </div>}
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-semibold px-4 border-b border-gray-400 fixed top-0 w-full bg-gray-100'>
                <span>Manage Products</span>
            </h1>
            <div className='flex items-center justify-end pr-4 mt-[75px]'>
                <form className='w-[40%]'>
                    <InputForm
                        id='search'
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder='Search products with title or description,...'
                    />
                </form>
            </div>
            <table className='table-auto'>
                <thead className='border border-white bg-sky-500 text-white'>
                    <tr>
                        <th>#</th>
                        <th>Thumb</th>
                        <th>Title</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Sold</th>
                        <th>Color</th>
                        <th>Ratings</th>
                        <th>Updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product, index) => (
                        <tr className='text-center border-b border-gray-500' key={product._id}>
                            <td className='py-2 px-2'>{((params.get('page') > 1 ? params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT) + index + 1}</td>
                            <td className='py-2 px-2'>
                                <img src={product.thumb} className='w-12 h-12 object-cover' alt='' />
                            </td>
                            <td className='py-2 px-2'>{product.title}</td>
                            <td className='py-2 px-2'>{product.brand}</td>
                            <td className='py-2 px-2'>{product.category}</td>
                            <td className='py-2 px-2'>{formatMoney(product.price)}</td>
                            <td className='py-2 px-2'>{product.quantity}</td>
                            <td className='py-2 px-2'>{product.sold}</td>
                            <td className='py-2 px-2'>{product.color || '###'}</td>
                            <td className='py-2 px-2'>{product.totalRating}</td>
                            <td className='py-2 px-2'>{moment(product.updatedAt).format('DD/MM/YYYY')}</td>
                            <td className='py-2 px-2'>
                                <div className='flex gap-2 items-center'>
                                    <span
                                        onClick={() => setEditProduct(product)}
                                        className='cursor-pointer hover:underline hover:text-yellow-500'
                                    >
                                        Edit
                                    </span>
                                    <span
                                        className='cursor-pointer hover:underline hover:text-red-500'
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full'>
                <Pagination totalCount={count} />
            </div>
        </div>
    )
}

export default ManageProduct