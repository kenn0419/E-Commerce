import React from 'react';
import avatar from '../assets/avatar_default.png'
import moment from 'moment';
import { renderStar } from '../ultils/helper';

const Comment = ({ image = avatar, name = 'Anonymus', updatedAt, comment, star }) => {
    return (
        <div className='flex gap-4 p-4 border-b'>
            <div className='flex-none'>
                <img src={image} alt='avatar' className='w-[30px] h-[30px] object-cover rounded-full' />
            </div>
            <div className='flex flex-col flex-auto'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-semibold'>{name}</h3>
                    <span className='text-xs italic'>{moment(updatedAt)?.fromNow()}</span>
                </div>
                <div className='flex flex-col gap-2 text-xs pl-3 mt-2 py-2 bg-gray-100 border-gray-300'>
                    <span className='flex items-center gap-1'>
                        <span className='font-semibold'>Rating:</span>
                        <span className='flex'>{renderStar(star, 18).map((item, index) => (<span key={index}>{item}</span>))}</span>
                    </span>
                    <span className='flex gap-1'>
                        <span className='font-semibold'>Comment:</span>
                        <span>{comment}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Comment