import { apiUpdateProduct } from 'apis';
import { Button, InputForm, Loading, MarkDownEditor, SelectForm } from 'components';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { showModal } from 'store/app/appSlice';
import { getBase64, validate } from 'ultils/helper';
import icons from 'ultils/icon';

const UpdateProduct = ({ editProduct, reRender, setEditProduct }) => {
    const { IoCloseOutline } = icons;
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.app);
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [payload, setPayload] = useState({
        description: ''
    })
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    useEffect(() => {
        reset({
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            quantity: editProduct?.quantity || '',
            color: editProduct?.color || '',
            category: editProduct?.category || '',
            brand: editProduct?.brand?.toLowerCase() || '',

        })
        setPayload({
            description: typeof editProduct?.description === 'object' ? editProduct?.description.join('. ') : editProduct?.description
        })
        setPreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.images || []
        })
    }, [editProduct])
    const [inValidFields, setInValidFields] = useState([]);
    const changeValue = useCallback((value) => {
        setPayload(value);
    }, [payload])
    const handlePreviewThumb = async (file) => {
        if (file?.type !== 'image/png' && file?.type !== 'image/jpeg' && file) {
            toast.warning('File is not supported!!!');
            return;
        }
        const toBase64 = await getBase64(file);
        setPreview(prev => ({ ...prev, thumb: toBase64 }))
    }
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
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0) {
            handlePreviewThumb(watch('thumb')[0]);
        }
    }, [watch('thumb')])
    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0) {
            handlePreviewImages(watch('images'));
        }
    }, [watch('images')])
    const handleUpdateProduct = async (data) => {
        const invalids = validate(payload, setInValidFields);
        if (invalids === 0) {
            if (data?.brand) data.brand = categories.find(item => item.title === data.category)?.brand.find(item => item.toLowerCase() === data.brand);
            if (data?.category) data.category = categories.find(item => item.title === data.category)?.title;
            const finalPayload = { ...data, ...payload };
            const formData = new FormData();
            for (let i of Object.entries(finalPayload)) {
                formData.append(i[0], i[1]);
            }
            if (finalPayload.thumb.length === 0) {
                formData.delete('thumb');
            }
            if (finalPayload.images.length === 0) {
                formData.delete('images');
            }
            if (finalPayload.thumb) {
                formData.append('thumb', finalPayload?.thumb?.length === 0 ? preview.thumb : finalPayload.thumb[0])
            }
            if (finalPayload.images) {
                const images = finalPayload.images.length === 0 ? preview.images : finalPayload.images;
                for (let image of images) formData.append('images', image);
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiUpdateProduct(formData, editProduct._id);
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (response.success) {
                reRender();
                setEditProduct();
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        }
    }
    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <h1 className='h-[75px] bg-gray-100 flex justify-between items-center text-3xl font-semibold px-4 border-b border-gray-400 fixed top-0 right-0 left-[327px] z-50'>
                <span>Updated Products</span>
                <span className='cursor-pointer hover:text-red-500' onClick={() => setEditProduct()}><IoCloseOutline size={32} /></span>
            </h1>
            <div className='p-4 mt-[75px]'>
                <form onSubmit={handleSubmit(handleUpdateProduct)}>
                    <InputForm
                        label='Name product'
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{
                            required: 'Require fill this field',
                        }}
                        fullWidth
                        placeholder='Name of new product'
                    />
                    <div className='w-full flex gap-4 my-8'>
                        <InputForm
                            label='Price'
                            register={register}
                            errors={errors}
                            id='price'
                            validate={{
                                required: 'Require fill this field',
                            }}
                            style={`flex-auto`}
                            placeholder='Price of new product'
                            type='number'
                        />
                        <InputForm
                            label='Quantity'
                            register={register}
                            errors={errors}
                            id='quantity'
                            validate={{
                                required: 'Require fill this field',
                                valueAsNumber: true,
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Quantity must be greater than 1'
                                }
                            }}
                            style={`flex-auto`}
                            placeholder='Quantity of new product'
                            type='number'
                        />
                        <InputForm
                            label='Color'
                            register={register}
                            errors={errors}
                            id='color'
                            validate={{
                                required: 'Require fill this field',
                            }}
                            style={`flex-auto`}
                            placeholder='Color of new product'
                        />
                    </div>
                    <div className='flex gap-4 w-full my-8'>
                        <SelectForm
                            label='Category'
                            register={register}
                            id='category'
                            errors={errors}
                            validate={{
                                required: 'Require fill this field'
                            }}
                            style={`flex-auto`}
                            options={categories?.map(item => ({ code: item.title, value: item.title }))}
                        />
                        <SelectForm
                            label='Brand (Optional)'
                            register={register}
                            id='brand'
                            errors={errors}
                            style={`flex-auto`}
                            options={categories?.find(category => category.title === watch('category'))?.brand?.map(item => ({ code: item.toLowerCase(), value: item }))}
                        />
                    </div>
                    <MarkDownEditor
                        name='description'
                        label='Description'
                        value={payload.description}
                        changeValue={changeValue}
                        inValidFields={inValidFields}
                        setInvalidFields={setInValidFields}
                    />
                    <div className='mt-4 flex flex-col gap-2'>
                        <label htmlFor='thumb' className='text-base font-semibold'>Upload thumb</label>
                        <input
                            type='file'
                            id='thumb'
                            {...register('thumb')}
                        />
                        {errors['thumb'] && <small className='text-xs text-red-600 italic'>{errors['thumb'].message}</small>}
                    </div>
                    {preview.thumb && <div className='my-4'>
                        <img src={preview.thumb} alt='thumbnail' className='w-[200px] object-contain' />
                    </div>}
                    <div className='mt-4 flex flex-col gap-2'>
                        <label htmlFor='images' className='text-base font-semibold'>Upload images of product</label>
                        <input
                            type='file'
                            id='images'
                            multiple
                            {...register('images')}
                        />
                        {errors['images'] && <small className='text-xs text-red-600 italic'>{errors['images'].message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images.map((image, index) => (
                            <div className='w-fit h-fit relative' key={index}>
                                <img
                                    src={image}
                                    alt='product'
                                    className='w-[200px] object-contain cursor-pointer'
                                />
                            </div>
                        ))}
                    </div>}
                    <div className='flex justify-end mt-4'>
                        <Button type='submit'>Update Product</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(UpdateProduct)