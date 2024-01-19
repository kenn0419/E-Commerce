import React, { memo, useEffect, useState } from 'react'
import icons from '../ultils/icon'
import { colors } from '../ultils/contants';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'

const SearchItem = ({ name, activeClick, handleChangeActiveFilter, type = 'checkbox' }) => {
    const { IoIosArrowDown } = icons;
    const navigate = useNavigate();
    const { category } = useParams();
    const [selected, setSelected] = useState([]);
    const handleSelect = (e) => {
        const alreadySelect = selected.find(item => item === e.target.value);
        if (alreadySelect) {
            setSelected(prev => prev.filter(item => item !== alreadySelect));
        } else {
            setSelected(prev => [...prev, e.target.value])
        }
        handleChangeActiveFilter();
    }
    useEffect(() => {
        navigate({
            pathname: `/${category}`,
            search: createSearchParams({
                color: selected
            }).toString(),
        })
    }, [selected])
    return (
        <div
            className='relative p-4 text-xs text-[#505050] border border-gray-800 flex justify-between items-center gap-4 cursor-pointer'
            onClick={() => handleChangeActiveFilter(name)}
        >
            {name}
            <IoIosArrowDown size={14} />
            {activeClick === name &&
                <div className='absolute top-[calc(100%+1px)] left-0 w-[250px] border bg-white min-h-[150px] z-50'>
                    {type === 'checkbox' && <div className=''>
                        <div className='border-b border-gray-300'>
                            <div className='p-4 flex items-center justify-between gap-4'>
                                <span className='whitespace-nowrap'>{`${selected.length} selected`}</span>
                                <span
                                    className='underline cursor-pointer'
                                    onClick={(e) => {
                                        setSelected([]);
                                        e.stopPropagation();
                                    }}
                                >
                                    Reset
                                </span>
                            </div>
                        </div>
                        <div onClick={(e) => e.stopPropagation()} className='p-4'>
                            {colors.map((color, index) => (
                                <div className='flex items-center text-sm text-[#505050] capitalize py-2'>
                                    <input
                                        type='checkbox'
                                        id={color}
                                        value={color}
                                        className='w-4 h-4 text-base border-none cursor-pointer'
                                        checked={selected.some(item => item === color)}
                                        onClick={(e) => handleSelect(e)}
                                    />
                                    <label htmlFor={color} className='pl-3'>{color}</label>
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
            }
        </div>
    )
}

export default memo(SearchItem)