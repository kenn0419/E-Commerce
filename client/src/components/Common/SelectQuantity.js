import { memo } from 'react'

const SelectQuantity = ({ quantity, handleQuantiTy, handleChangeQuantity, remainQuantity, isHiden }) => {
    return (
        <div className='flex items-center justify-between mt-2 w-full'>
            {!isHiden && <span className='font-semibold text-base'>Quantity:</span>}
            <div className='flex items-center mt-2 w-full justify-center'>
                <span
                    className='text-sm text-gray-500 border-r pr-1 border-black cursor-pointer'
                    onClick={() => handleChangeQuantity('minus')}
                >
                    -
                </span>
                <input
                    type='number'
                    className='text-sm border w-[60px] outline-none border-none bg-white p-1 m-1 text-center text-gray-500'
                    value={quantity}
                    onChange={(e) => handleQuantiTy(e.target.value)}
                />
                <span
                    className='text-sm text-gray-500 border-l pl-1 border-black cursor-pointer'
                    onClick={() => handleChangeQuantity('plus')}
                >
                    +
                </span>
            </div>
            {!isHiden && <span className='whitespace-nowrap'>{`${remainQuantity} products in stock`}</span>}
        </div>
    )
}

export default memo(SelectQuantity)