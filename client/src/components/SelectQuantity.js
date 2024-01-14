import React, { memo } from 'react'

const SelectQuantity = ({ quantity, handleQuantiTy, handleChangeQuantity, remainQuantity }) => {
    return (
        <div className='flex items-center mt-2'>
            <span>Quantity:</span>
            <span
                className='font-semibold text-[24px] p-2 rounded-l-full border ml-1 cursor-pointer'
                onClick={() => handleChangeQuantity('minus')}
            >
                -
            </span>
            <input
                type='number'
                className='border p-2 w-[60px] outline-none text-center'
                value={quantity}
                onChange={(e) => handleQuantiTy(e.target.value)}
            />
            <span
                className='font-semibold text-[24px] p-2 rounded-r-full border mr-1 cursor-pointer'
                onClick={() => handleChangeQuantity('plus')}
            >
                +
            </span>
            <span>{`${remainQuantity} sản phẩm có sẵn`}</span>
        </div>
    )
}

export default memo(SelectQuantity)