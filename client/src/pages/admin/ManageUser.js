import { apiGetUsers } from 'apis'
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { roles } from 'ultils/contants';

const ManageUser = () => {
    const [users, setUsers] = useState();
    const fetchApiGetUsers = async (params) => {
        const response = await apiGetUsers(params);
        if (response.success) {
            setUsers(response);
        }
    }
    useEffect(() => {
        fetchApiGetUsers();
    }, [])
    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-semibold px-4 border-b border-gray-400'>
                <span>Manage Users</span>
            </h1>
            <div className='w-full p-4'>
                <table className='table-auto mb-6 text-center w-full'>
                    <thead className='font-bold bg-gray-700 text-white text-[13px] border-gray-300'>
                        <tr>
                            <th className='px-4 py-2'>#</th>
                            <th className='px-4 py-2'>Email</th>
                            <th className='px-4 py-2'>Fullname</th>
                            <th className='px-4 py-2'>Role</th>
                            <th className='px-4 py-2'>Phone</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Created At</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.users.map((user, index) => (
                            <tr key={user._id} className={clsx('border border-gray-300', index % 2 === 0 ? 'bg-gray-300' : '-600')}>
                                <td className='py-2 px-4'>{index + 1}</td>
                                <td className='py-2 px-4'>{user.email}</td>
                                <td className='py-2 px-4'>{`${user.firstname}  ${user.lastname}`}</td>
                                <td className='py-2 px-4'>{roles.find(item => item.code === +user.role)?.value}</td>
                                <td className='py-2 px-4'>{user.mobile}</td>
                                <td className='py-2 px-4'>{!user.isBlocked ? 'Active' : 'Blocked'}</td>
                                <td className='py-2 px-4'>{moment(user.createdAt).format('DD/MM/YYYY')}</td>
                                <td className='py-2 px-4 flex items-center gap-3 justify-center'>
                                    <span className='cursor-pointer text-yellow-600 hover:underline'>Edit</span>
                                    <span className='cursor-pointer text-red-600 hover:underline'>Delete</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageUser