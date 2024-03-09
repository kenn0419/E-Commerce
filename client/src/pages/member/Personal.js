import { Button, InputForm } from 'components';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';

const Personal = () => {
    const { current } = useSelector(state => state.user);
    const { register, formState: { errors }, handleSubmit, reset, watch } = useForm();
    useEffect(() => {
        reset({
            firstname: current.firstname,
            lastname: current.lastname,
            email: current.email,
            mobile: current.mobile,
        })
    }, [current])
    const handleUpdate = async (data) => {
        console.log(data)
    }
    return (
        <div className='w-full relative'>
            <header className='text-3xl font-semibold p-4 border-b border-sky-300'>Personal</header>
            <form className='w-4/5 mx-auto py-8 flex flex-col gap-5' onSubmit={handleSubmit(handleUpdate)}>
                <InputForm
                    label='Firstname'
                    register={register}
                    errors={errors}
                    id='firstname'
                    validate={{
                        required: 'Require fill this field',
                    }}
                    fullWidth
                    placeholder='Enter your firstname'
                />
                <InputForm
                    label='Lastname'
                    register={register}
                    errors={errors}
                    id='lastname'
                    validate={{
                        required: 'Require fill this field',
                    }}
                    fullWidth
                    placeholder='Enter your lastname'
                />
                <InputForm
                    label='Email address'
                    register={register}
                    errors={errors}
                    id='email'
                    validate={{
                        required: 'Require fill this field',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    }}
                    fullWidth
                    placeholder='Enter your email address'
                />
                <InputForm
                    label='Phone number'
                    register={register}
                    errors={errors}
                    id='mobile'
                    validate={{
                        required: 'Require fill this field',
                    }}
                    fullWidth
                    placeholder='Enter your phone number'
                />
                <div className='flex items-center gap-1'>
                    <span className='font-semibold'>Account Status: </span>
                    <span>{current?.isBlocked ? 'Block' : 'Active'}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <span className='font-semibold'>Role: </span>
                    <span>{+current?.role === 0 ? 'Admin' : 'User'}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <span className='font-semibold'>Created Date: </span>
                    <span>{moment(current.createdAt).format('DD/MM/YYYY')}</span>
                </div>
                <div className='flex justify-end w-full'>
                    <Button type='submit'>Update Information</Button>
                </div>
            </form>
        </div>
    )
}

export default Personal