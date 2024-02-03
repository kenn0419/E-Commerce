import { memo } from 'react'

const SelectField = ({ value, changeValue, options }) => {
    return (
        <select
            className='text-sm p-2 border'
            value={value}
            onChange={(e) => changeValue(e.target.value)}>
            <option value=''>Random</option>
            {options?.map(option => (
                <option key={option.id} value={option.value}>{option.text}</option>
            ))}
        </select>
    )
}

export default memo(SelectField);