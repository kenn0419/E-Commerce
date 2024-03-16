import clsx from 'clsx';
import React, { memo } from 'react'
import Select from 'react-select';

const CustomSelect = ({ label, placeholder, onChange, options = [], value = '', className }) => {

    return (
        <div>
            {label && <h3 className='font-medium'>{label}</h3>}
            <Select
                id='status'
                placeholder={placeholder}
                isClearable
                options={options}
                value={value}
                isSearchable
                onChange={value => onChange(value ? value : '')}
                formatOptionLabel={(option) =>
                    <div className='flex text-black items-center gap-2'>
                        <span>{option.label}</span>
                    </div>
                }
                className={{ control: () => clsx('border border-gray-500 rounded-lg py-1', className) }}
            />
        </div>
    );
}

export default memo(CustomSelect);