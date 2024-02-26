import { Button, InputForm, SelectForm, } from 'components';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';

const CreateProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const { categories } = useSelector(state => state.app);
    const handleCreateProduct = (data) => {
        if (data?.brand) data.brand = categories.find(item => item._id === data.category)?.brand.find((item, index) => index === +data.brand);
        if (data?.category) data.category = categories.find(item => item._id === data.category)?.title;
        console.log(data);
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
                    <div className='flex justify-end'>
                        <Button type='submit'>Create</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct