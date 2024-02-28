import { Button, InputForm, MarkDownEditor, SelectForm, } from 'components';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { validate } from 'ultils/helper';

const CreateProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const { categories } = useSelector(state => state.app);
    const [payload, setPayload] = useState({
        description: ''
    })
    const [inValidFields, setInValidFields] = useState([]);
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
                    <div className='flex justify-end mt-4'>
                        <Button type='submit'>Create New Products</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct