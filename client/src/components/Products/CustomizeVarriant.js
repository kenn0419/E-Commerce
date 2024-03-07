import { apiAddVarriant } from 'apis';
import Button from 'components/Button/Button';
import Loading from 'components/Common/Loading';
import InputForm from 'components/Input/InputForm';
import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showModal } from 'store/app/appSlice';
import Swal from 'sweetalert2';
import { getBase64 } from 'ultils/helper';
import icons from 'ultils/icon'

const CustomizeVarriant = ({ customizeVarriant, setCustomizeVarriant, reRender }) => {
    const dispatch = useDispatch();
    const { IoCloseOutline } = icons;
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [preview, setPreview] = useState({
        thumb: '',
        images: []
    })
    useEffect(() => {
        reset({
            title: customizeVarriant?.title,
            color: customizeVarriant?.color,
            price: customizeVarriant?.price,
        })
    }, [customizeVarriant])
    const handlePreviewThumb = async (file) => {
        if (file?.type !== 'image/png' && file?.type !== 'image/jpeg' && file) {
            toast.warning('File is not supported!!!');
            return;
        }
        const toBase64 = await getBase64(file);
        setPreview(prev => ({ ...prev, thumb: toBase64 }))
    }
    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0) {
            handlePreviewThumb(watch('thumb')[0]);
        }
    }, [watch('thumb')])
    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            if (file?.type !== 'image/png' && file?.type !== 'image/jpeg' && file) {
                toast.warning('File is not supported!!!');
                return;
            }
            const toBase64 = await getBase64(file);
            imagesPreview.push(toBase64);
        }
        if (imagesPreview.length > 0) {
            setPreview(prev => ({ ...prev, images: imagesPreview }))
        }
    }
    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0) {
            handlePreviewImages(watch('images'));
        }
    }, [watch('images')])
    const handleAddVarriant = async (data) => {
        if (data.color === customizeVarriant?.color) {
            Swal.fire('Oops!!!', 'The color cannot match the default color', 'info');
            return;
        } else {
            const formData = new FormData();
            for (let i of Object.entries(data)) {
                formData.append(i[0], i[1]);
            }
            if (data.thumb) {
                formData.append('thumb', data.thumb[0])
            }
            if (data.images) {
                for (let image of data.images) formData.append('images', image);
            }
            const response = await apiAddVarriant(formData, customizeVarriant?._id);
            if (response.success) {
                reRender();
                setCustomizeVarriant();
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        }
    }
    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <h1 className='h-[75px] bg-gray-100 flex justify-between items-center text-3xl font-semibold px-4 border-b border-gray-400 fixed top-0 right-0 left-[327px] z-50'>
                <span>Customize Varriant Of Products</span>
                <span className='cursor-pointer hover:text-red-500' onClick={() => setCustomizeVarriant()}><IoCloseOutline size={32} /></span>
            </h1>
            <div className='mt-[90px]'>
                <form className='p-4' onSubmit={handleSubmit(handleAddVarriant)}>
                    <div className='flex gap-4 items-center flex-wrap'>
                        <InputForm
                            label='Original Name'
                            register={register}
                            errors={errors}
                            id='title'
                            style={`flex-auto`}
                            placeholder='Title of varriant'
                        />
                    </div>
                    <div className='flex gap-4 mt-5 items-center'>
                        <InputForm
                            label='Price Varriant'
                            register={register}
                            errors={errors}
                            id='price'
                            validate={{
                                required: 'Require fill this field',
                            }}
                            style={`flex-auto`}
                            placeholder='Price of varriant'
                            type='number'
                        />
                        <InputForm
                            label='Color Varriant'
                            register={register}
                            errors={errors}
                            id='color'
                            validate={{
                                required: 'Require fill this field',
                            }}
                            style={`flex-auto`}
                            placeholder='Color of varriant'
                        />
                    </div>
                    <div className='mt-5 flex flex-col gap-2'>
                        <label htmlFor='thumb' className='text-base font-semibold'>Upload thumb</label>
                        <input
                            type='file'
                            id='thumb'
                            {...register('thumb', { required: 'Require choose file' })}
                        />
                        {errors['thumb'] && <small className='text-xs text-red-600 italic'>{errors['thumb'].message}</small>}
                    </div>
                    {preview.thumb && <div className='my-4'>
                        <img src={preview.thumb} alt='thumbnail' className='w-[200px] object-contain' />
                    </div>}
                    <div className='mt-4 flex flex-col gap-2'>
                        <label htmlFor='images' className='text-base font-semibold'>Upload images of varriant</label>
                        <input
                            type='file'
                            id='images'
                            multiple
                            {...register('images', { required: 'Require choose file' })}
                        />
                        {errors['images'] && <small className='text-xs text-red-600 italic'>{errors['images'].message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images.map((image, index) => (
                            <div
                                className='w-fit h-fit relative'
                                key={index}
                            >
                                <img
                                    src={image}
                                    alt='product'
                                    className='w-[200px] object-contain cursor-pointer'
                                />
                            </div>
                        ))}
                    </div>}
                    <div className='flex justify-end mt-4'>
                        <Button type='submit'>Add Varriant</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(CustomizeVarriant)