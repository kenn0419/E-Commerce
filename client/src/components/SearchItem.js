import React, { memo, useState } from 'react'
import icons from '../ultils/icon'

const SearchItem = ({ name, activeClick, handleChangeActiveFilter, type = 'checkbox' }) => {
    const { IoIosArrowDown } = icons;
    const [selected, setSelected] = useState(0);
    return (
        <div
            className='relative p-4 text-xs text-[#505050] border border-gray-800 flex justify-between items-center gap-4 hover:shadow-main hover:border-none'
            onClick={() => handleChangeActiveFilter(name)}
        >
            {name}
            <IoIosArrowDown size={14} />
            {activeClick === name &&
                <div className='absolute top-[calc(100%+1px)] left-0 w-fit p-4 shadow-main bg-white min-h-[150px]'>
                    {type === 'checkbox' && <div className=''>
                        <div className='p-4 flex items-center justify-between gap-4'>
                            <span className='whitespace-nowrap'>{`${selected} selected`}</span>
                            <span
                                className='underline cursor-pointer'
                                onClick={() => setSelected(0)}
                            >
                                Reset
                            </span>
                        </div>
                    </div>}
                </div>
            }
        </div>
    )
}

export default memo(SearchItem)