import { Button, InputForm, MarkDownEditor, SelectForm, } from 'components';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getBase64, validate } from 'ultils/helper';
import icons from 'ultils/icon';

const CreateProduct = () => {
    const { FaRegTrashAlt } = icons;
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const { categories } = useSelector(state => state.app);
    const [payload, setPayload] = useState({
        description: ''
    })
    const [inValidFields, setInValidFields] = useState([]);
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const [hoverElement, setHoverElement] = useState();
    const changeValue = useCallback((value) => {
        setPayload(value);
    }, [payload])
    const handleCreateProduct = (data) => {
        const invalids = validate(payload, setInValidFields);
        if (invalids === 0) {
            if (data?.brand) data.brand = categories.find(item => item._id === data.category)?.brand.find((item, index) => index === +data.brand);
            if (data?.category) data.category = categories.find(item => item._id === data.category)?.title;
            const finalPayload = { ...data, ...payload };
            const formData = new FormData();
            for (let i of Object.entries(finalPayload)) {
                formData.append(i[0], i[1]);
            }
        }
    }
    const handlePreviewThumb = async (file) => {
        if (file?.type !== 'image/png' && file?.type !== 'image/jpeg' && file) {
            toast.warning('File is not supported!!!');
            return;
        }
        const toBase64 = await getBase64(file);
        setPreview(prev => ({ ...prev, thumb: toBase64 }))
    }
    useEffect(() => {
        handlePreviewThumb(watch('thumb')[0]);
    }, [watch('thumb')])
    const handlePreviewImages = async (files) => {
        console.log(files);
        const imagesPreview = [];
        for (let file of files) {
            if (file?.type !== 'image/png' && file?.type !== 'image/jpeg' && file) {
                toast.warning('File is not supported!!!');
                return;
            }
            const toBase64 = await getBase64(file);
            imagesPreview.push({ name: file.name, path: toBase64 });
        }
        if (imagesPreview.length > 0) {
            setPreview(prev => ({ ...prev, images: imagesPreview }))
        }
    }
    useEffect(() => {
        handlePreviewImages(watch('images'));
    }, [watch('images')])
    const handleRemoveImages = (name) => {
        const files = [...watch('images')]
        if (preview.images.some(item => item.name === name)) {
            setPreview(prev => ({ ...prev, images: prev.images.filter(image => image.name !== name) }))
            reset({
                images: files.filter(image => image.name !== name)
            })
        }
    }
    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-semibold px-4 border-b border-gray-400'>
                <span>Create New Product</span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
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
                            options={categories?.map(item => ({ code: item._id, value: item.title }))}
                        />
                        <SelectForm
                            label='Brand (Optional)'
                            register={register}
                            id='brand'
                            errors={errors}
                            style={`flex-auto`}
                            options={categories?.find(category => category._id === watch('category'))?.brand?.map((item, index) => ({ code: index, value: item }))}
                        />
                    </div>
                    <MarkDownEditor
                        name='description'
                        label='Description'
                        changeValue={changeValue}
                        inValidFields={inValidFields}
                        setInvalidFields={setInValidFields}
                    />
                    <div className='mt-4 flex flex-col gap-2'>
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
                        <label htmlFor='images' className='text-base font-semibold'>Upload images of product</label>
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
                                onMouseEnter={() => setHoverElement(image.name)}
                                onMouseLeave={() => setHoverElement()}
                            >
                                <img
                                    key={index}
                                    src={image.path}
                                    alt='product'
                                    className='w-[200px] object-contain cursor-pointer'
                                />
                                {hoverElement === image.name &&
                                    <div
                                        onClick={() => handleRemoveImages(image.name)}
                                        className='absolute animate-scale-up-center inset-0 bg-overlay flex justify-center items-center cursor-pointer'
                                    >
                                        <FaRegTrashAlt size={45} color='white' />
                                    </div>}
                            </div>
                        ))}
                    </div>}
                    <div className='flex justify-end mt-4'>
                        <Button type='submit'>Create New Products</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct