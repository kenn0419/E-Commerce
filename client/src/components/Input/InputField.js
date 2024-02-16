import clsx from 'clsx';
import React, { memo } from 'react'

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields, style, placeholder, isHideLabel }) => {
    return (
        <div className='flex flex-col gap-1 relative'>
            {!isHideLabel && value && <label
                className='text-xs absolute top-2 left-[10px] bg-white z-10 px-1 animate-slide-top-sm'
            >
                {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
            </label>}
            <input
                type={type || 'text'}
                className={clsx('px-4 py-2 rounded-md placeholder:text-gray-400 text-gray-500 border mt-4 placeholder:text-sm placeholder:italic outline-none', style)}
                placeholder={placeholder || nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidFields?.some(item => item.name === nameKey) &&
                <small className='text-hover italic'>{invalidFields.find(item => item.name === nameKey)?.message}</small>}
        </div>
    )
}

export default memo(InputField);