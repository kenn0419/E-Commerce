import { memo } from 'react'

const ExtraInfo = ({ iconImage, title, sub, id }) => {
    return (
        <div key={id} className='flex items-center gap-4 border mb-3 p-2'>
            <span className='p-2 bg-[#505050] rounded-full'>{iconImage}</span>
            <div className='text-sm'>
                <h3 className='font-semibold'>{title}</h3>
                <span className='text-gray-400 text-xs'>{sub}</span>
            </div>
        </div>
    )
}

export default memo(ExtraInfo);