import React, { memo, useEffect, useRef } from 'react'
import icons from '../ultils/icon'

const VoteBar = ({ number, ratingCount, ratingTotal }) => {
    const { FaStar } = icons;
    const percentRef = useRef();
    useEffect(() => {
        percentRef.current.style.cssText = `right: ${100 - Math.round(ratingTotal / ratingCount * 100)}%`
    }, [ratingCount, ratingTotal])
    return (
        <div className='flex items-center gap-2 text-gray-500'>
            <div className='flex justify-center items-center gap-1 text-sm w-[10%]'>
                <span className='font-semibold'>{number}</span>
                <FaStar color='orange' />
            </div>
            <div className='w-[75%]'>
                <div className='w-full h-[5px] bg-gray-300 rounded-l-full rounded-r-full relative'>
                    <div ref={percentRef} className='bg-red-500 rounded-l-full rounded-r-full absolute inset-0'></div>
                </div>
            </div>
            <div className='w-[15%] text-xs flex justify-center'>
                {`${ratingTotal || 0} reviews`}
            </div>
        </div>
    )
}

export default memo(VoteBar)