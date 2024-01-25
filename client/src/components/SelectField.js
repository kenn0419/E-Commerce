import React, { memo } from 'react'

const SelectField = ({ value, changeValue, options }) => {
    return (
        <select className='text-sm' value={value} onChange={(e) => changeValue(e.target.value)}>
            <option value=''>Random</option>
            {options?.map(option => (
                <option key={option.id} value={option.value}>{option.text}</option>
            ))}
        </select>
    )
}

export default memo(SelectField);