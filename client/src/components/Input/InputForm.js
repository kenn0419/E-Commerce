import clsx from 'clsx';
import React, { memo } from 'react'

const InputForm = ({ label, disabled, register, errors, id, validate, type = 'text', placeholder, fullWidth, defaultValue, style, readOnly }) => {
    return (
        <div className={clsx('flex flex-col h-[50px] gap-1', style)}>
            {label && <label className='font-semibold' htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx(' px-2 py-2 text-sm rounded-lg  outline-none border border-gray-400 my-auto', fullWidth && 'w-full', disabled ? 'bg-gray-200' : 'bg-white')}
                defaultValue={defaultValue}
                readOnly={readOnly}
            />
            {errors[id] && <small className='text-xs text-red-600 italic'>{errors[id].message}</small>}
        </div>
    )
}

export default memo(InputForm);