import React, { memo } from 'react'

const CountDown = ({ unit, number }) => {
    return (
        <div className='w-[33%] h-[60px] flex justify-center bg-gray-200 rounded-sm flex-col items-center'>
            <span className='font-semibold text-gray-800'>{number}</span>
            <span className='text-gray-500 text-xs'>{unit}</span>
        </div>
    )
}

export default memo(CountDown);