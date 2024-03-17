import React, { memo } from 'react'
import { renderStar, formatMoney } from 'ultils/helper'
import { useNavigate } from 'react-router-dom'


const ProductCard = ({ productData }) => {
    const navigate = useNavigate();

    return (
        <div className='w-[30%] flex items-center flex-auto border mr-[20px] mb-[20px]'>
            <img
                src={productData?.thumb}
                alt='' className='w-[120px] object-contain p-4 cursor-pointer'
                onClick={() => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}

            />
            <div className='w-full flex flex-col px-4 gap-1 text-xs'>
                <span className='line-clamp-1 text-sm'>{productData?.title}</span>
                <span className='flex h-4'>{renderStar(productData?.totalRating)?.map((item, index) => <span key={index}>{item}</span>)}</span>
                <span className=''>{formatMoney(productData?.price)}</span>
            </div>
        </div>
    )
}

export default memo(ProductCard);