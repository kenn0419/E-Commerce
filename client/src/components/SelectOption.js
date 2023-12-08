import React from 'react'

const selectOption = ({ icon }) => {
    return (
        <div
            className='
            w-10 h-10 bg-white rounded-full border-gray-800 shadow-md 
            flex items-center justify-center 
            hover:bg-[#393939] cursor-pointer hover:text-white'
        >
            {icon}
        </div>
    )
}

export default selectOption