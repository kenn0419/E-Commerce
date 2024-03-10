import { Button, InputForm } from 'components';
import moment from 'moment';
import avatar from 'assets/avatar_default.png'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { apiUpdateCurrent } from 'apis';
import { getCurrent } from 'store/user/asyncAction';
import { toast } from 'react-toastify';
import { getBase64 } from 'ultils/helper';

const Personal = () => {
    const dispatch = useDispatch();
    const { current } = useSelector(state => state.user);
    const [preview, setPreview] = useState({
        avatar: '',
    })
    const { register, formState: { errors, isDirty }, handleSubmit, reset, watch } = useForm();
    useEffect(() => {
        reset({
            firstname: current.firstname,
            lastname: current.lastname,
            email: current.email,
            mobile: current.mobile,
        })
    }, [current])
    const handlePreview = async (file) => {
        if (file?.type !== 'image/png' && file?.type !== 'image/jpeg' && file) {
            toast.warning('File is not supported!!!');
            return;
        }
        const toBase64 = await getBase64(file);
        setPreview(prev => ({ ...prev, avatar: toBase64 }))
    }
    useEffect(() => {
        if (watch('avatar') instanceof FileList && watch('avatar').length > 0) {
            handlePreview(watch('avatar')[0]);
        }
    }, [watch('avatar')])
    const handleUpdate = async (data) => {
        const formData = new FormData();
        if (data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0]);
        }
        delete data.avatar;
        for (let i of Object.entries(data)) {
            formData.append(i[0], i[1]);
        }
        const response = await apiUpdateCurrent(formData);
        if (response.success) {
            dispatch(getCurrent());
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }
    return (
        <div className='w-full relative'>
            <header className='text-3xl font-semibold p-4 border-b border-sky-300'>Personal</header>
            <form className='w-4/5 mx-auto py-8 flex flex-col gap-7' onSubmit={handleSubmit(handleUpdate)}>
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
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
                        pattern: {
                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                            message: "invalid phone number"
                        }
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
                <div className='flex flex-col gap-1'>
                    <span className='font-semibold'>Avatar: </span>
                    <label htmlFor='avatar'>
                        <img src={preview.avatar || current.avatar || avatar} alt='Avatar' className='w-[100px] h-[100px] object-cover' />
                    </label>
                    <input
                        hidden
                        type='file'
                        id='avatar'
                        {...register('avatar')}
                    />
                </div>
                {isDirty && <div className='flex justify-end w-full'>
                    <Button type='submit'>Update Information</Button>
                </div>}
            </form>
        </div>
    )
}

export default Personal