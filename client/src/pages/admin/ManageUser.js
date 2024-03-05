import { apiDeleteUser, apiGetUsers, apiUpdateUser } from 'apis'
import clsx from 'clsx';
import { Button, InputField, InputForm, Pagination, SelectForm } from 'components';
import useDebounce from 'hooks/useDebounce';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { roles, blockStatus } from 'ultils/contants';

const ManageUser = () => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        email: '',
        firstname: '',
        lastname: '',
        role: '',
        mobile: '',
        isBlocked: '',
    });
    const [params] = useSearchParams();
    const [users, setUsers] = useState();
    const [queries, setQueries] = useState({
        search: ''
    });
    const [editItem, setEditItem] = useState();
    const [update, setUpdate] = useState(false);
    const fetchApiGetUsers = async (params) => {
        const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_LIMIT });
        if (response.success) {
            setUsers(response);
        }
    }
    const queriesDebounce = useDebounce(queries.search, 500);
    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        if (queriesDebounce) {
            queries.q = queriesDebounce
        }
        fetchApiGetUsers(queries);
    }, [queriesDebounce, params, update])
    const render = useCallback(() => {
        setUpdate(!update);
    }, [update])
    const handleUpdate = async (data) => {
        const response = await apiUpdateUser(data, editItem._id);
        if (response.success) {
            toast.success(response.message);
            render();
            setEditItem();
        }
    }
    const handleDeleteUser = (uid, name) => {
        Swal.fire({
            title: 'Are you sure to delete this user ?',
            text: `Delete user have name: ${name}??`,
            showCancelButton: true,
            confirmButtonColor: 'red',
            confirmButtonText: 'Delete'
        }).then(async (res) => {
            if (res.isConfirmed) {
                const response = await apiDeleteUser(uid);
                if (response.success) {
                    toast.success(response.message);
                    render();
                }
            }
        })
    }

    return (
        <div className={clsx('w-full', editItem && 'pl-16')}>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-semibold px-4 border-b border-gray-400'>
                <span>Manage Users</span>
            </h1>
            <div className='w-full p-4'>
                <div className='flex justify-end items-center py-3'>
                    <InputField
                        isHideLabel
                        nameKey={'search'}
                        placeholder='Enter name or mail to search'
                        value={queries.search}
                        style={`w-[400px]`}
                        setValue={setQueries}
                    />
                </div>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    {editItem && <Button type='submit'>Update</Button>}
                    <table className='table-auto mb-6 text-center w-full'>
                        <thead className='font-bold bg-gray-700 text-white text-[13px] border-gray-300'>
                            <tr>
                                <th className='px-4 py-2'>#</th>
                                <th className='px-4 py-2'>Email</th>
                                <th className='px-4 py-2'>Firstname</th>
                                <th className='px-4 py-2'>Lastname</th>
                                <th className='px-4 py-2'>Role</th>
                                <th className='px-4 py-2'>Phone</th>
                                <th className='px-4 py-2'>Status</th>
                                <th className='px-4 py-2'>Created At</th>
                                <th className='px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.users.map((user, index) => (
                                <tr key={user._id} className={clsx('border border-gray-300', index % 2 === 0 ? 'bg-gray-300' : '')}>
                                    <td className='py-2 px-2'>{index + 1}</td>
                                    <td className='py-2 px-2'>
                                        {editItem?._id === user._id ?
                                            <InputForm
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editItem?.email}
                                                id='email'
                                                validate={{
                                                    required: 'Please fill this field',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "invalid email address"
                                                    }
                                                }}
                                            />
                                            :
                                            <span>{user.email}</span>
                                        }
                                    </td>
                                    <td className='py-2 px-2'>
                                        {editItem?._id === user._id ?
                                            <InputForm
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editItem?.firstname}
                                                id='firstname'
                                                validate={{ required: 'Please fill this field' }}
                                            />
                                            :
                                            <span>{user.firstname}</span>
                                        }
                                    </td>
                                    <td className='py-2 px-2'>
                                        {editItem?._id === user._id ?
                                            <InputForm
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editItem?.lastname}
                                                id='lastname'
                                                validate={{ required: 'Please fill this field' }}
                                            />
                                            :
                                            <span>{user.lastname}</span>
                                        }
                                    </td>
                                    <td className='py-2 px-2'>
                                        {editItem?._id === user._id ?
                                            <SelectForm
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={user.role}
                                                id='role'
                                                validate={{ required: 'Please fill this field' }}
                                                options={roles}
                                            />
                                            :
                                            <span>
                                                {roles.find(item => item.code === +user.role)?.value}
                                            </span>
                                        }
                                    </td>
                                    <td className='py-2 px-2'>
                                        {editItem?._id === user._id ?
                                            <InputForm
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editItem?.mobile}
                                                id='mobile'
                                                validate={{
                                                    required: 'Please fill this field',
                                                    pattern: {
                                                        value: /^[62|0]+\d{9}/gi,
                                                        message: "invalid phone number"
                                                    }
                                                }}
                                            />
                                            :
                                            <span>{user.mobile}</span>
                                        }
                                    </td>
                                    <td className='py-2 px-2'>
                                        {editItem?._id === user._id ?
                                            <SelectForm
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={user.isBlocked}
                                                id='isBlocked'
                                                validate={{ required: 'Please fill this field' }}
                                                options={blockStatus}
                                            />
                                            :
                                            <span>
                                                {!user.isBlocked ? 'Active' : 'Blocked'}
                                            </span>}
                                    </td>
                                    <td className='py-2 px-2'>{moment(user.createdAt).format('DD/MM/YYYY')}</td>
                                    <td className='py-2 px-2'>
                                        <div className='flex items-center gap-3 justify-center'>
                                            {editItem?._id === user._id ? <span
                                                className='cursor-pointer text-yellow-600 hover:underline'
                                                onClick={() => setEditItem()}
                                            >
                                                Back
                                            </span> : <span
                                                className='cursor-pointer text-yellow-600 hover:underline'
                                                onClick={() => {
                                                    reset({
                                                        email: editItem?.email,
                                                        firstname: editItem?.firstname,
                                                        lastname: editItem?.lastname,
                                                        role: editItem?.role,
                                                        mobile: editItem?.mobile,
                                                        isBlocked: editItem?.isBlocked,
                                                    })
                                                    setEditItem(user);
                                                }}
                                            >
                                                Edit
                                            </span>}
                                            <span
                                                onClick={() => handleDeleteUser(user._id, `${user.firstname} ${user.lastname}`)}
                                                className='cursor-pointer text-red-600 hover:underline'
                                            >
                                                Delete</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
                <div className='w-full'>
                    <Pagination
                        totalCount={users?.counts}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManageUser