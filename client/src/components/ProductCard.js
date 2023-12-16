import React from 'react'
import { renderStar, formatMoney } from '../ultils/helper'

const ProductCard = ({ productData }) => {
    return (
        <div className='w-[30%] flex items-center flex-auto border mr-[20px] mb-[20px]'>
            <img src={productData?.thumb} alt='' className='w-[120px] object-contain p-4' />
            <div className='w-full flex flex-col px-4 gap-1 text-xs'>
                <span className='line-clamp-1 text-sm'>{productData?.title}</span>
                <span className='flex h-4'>{renderStar(productData?.totalRating)}</span>
                <span className=''>{formatMoney(productData?.price)}</span>
            </div>
        </div>
    )
}

export default ProductCard