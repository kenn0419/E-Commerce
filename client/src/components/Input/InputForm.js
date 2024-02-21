import clsx from 'clsx';
import React, { memo } from 'react'

const InputForm = ({ label, disabled, register, errors, id, validate, type = 'text', placeholder, fullWidth, defaultValue }) => {
    return (
        <div className='flex flex-col h-[50px] gap-1'>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx('bg-white px-2 py-2 text-sm rounded-lg outline-none border-gray-600', fullWidth && 'w-full')}
                defaultValue={defaultValue}
            />
            {errors[id] && <small className='text-xs text-red-600 italic'>{errors[id].message}</small>}
        </div>
    )
}

export default memo(InputForm);