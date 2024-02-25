import clsx from 'clsx'
import React, { memo } from 'react'

const SelectForm = ({ label, options = [], register, errors, id, validate, style, fullWidth, defaultValue }) => {
    return (
        <div className='flex flex-col gap-1'>
            {label && <label htmlFor={id}>{label}</label>}
            <select
                id={id}
                {...register(id, validate)}
                defaultValue={defaultValue}
                className={clsx('py-2 px-2 rounded-lg', fullWidth && 'w-full', style)}
            >
                <option value=''>---Choose---</option>
                {options.map(item => (
                    <option key={item.value} value={item.code}>{item.value}</option>
                ))}
            </select>
            {errors[id] && <small className='text-xs text-red-600 italic'>{errors[id].message}</small>}
        </div>
    )
}

export default memo(SelectForm)