import React from 'react'

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
    return (
        <div className='w-full flex flex-col gap-1 relative'>
            {value && <label
                className='text-xs absolute top-2 left-[10px] bg-white z-10 px-1 animate-slide-top-sm'
            >
                {nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
            </label>}
            <input
                type={type || 'text'}
                className='px-4 py-2 rounded-md placeholder:text-gray-400 text-gray-500 border 
                w-full mt-4 placeholder:text-sm placeholder:italic outline-none'
                placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFields([])}
            />
            {invalidFields.some(item => item.name === nameKey) &&
                <small className='text-hover italic'>{invalidFields.find(item => item.name === nameKey)?.message}</small>}
        </div>
    )
}

export default InputField