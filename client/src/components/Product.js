import React, { useState } from 'react';
import no_image from '../assets/no_image.png';
import label from '../assets/new.png';
import trending from '../assets/trending.png';
import { formatMoney } from '../ultils/helper';
import { renderStar } from '../ultils/helper';
import { SelectOption } from '.';
import icons from '../ultils/icon';


const Product = ({ productData, isNew, pid }) => {
    const { FaHeart, FaEye, TiThMenu } = icons;
    const [isShowOptions, setIsShowOptions] = useState(false);
    return (
        <div className='w-full text-base px-[10px]'>
            <div
                className='w-full border p-[15px] flex flex-col items-center gap-2'
                onMouseEnter={e => setIsShowOptions(true)}
                onMouseLeave={e => setIsShowOptions(false)}
            >
                <div className='w-full relative'>
                    {isShowOptions && <div
                        className='absolute bottom-[-10px] z-30 flex justify-center w-full gap-2 animate-slide-top'
                    >
                        <SelectOption icon={<FaHeart />} />
                        <SelectOption icon={<TiThMenu />} />
                        <SelectOption icon={<FaEye />} />
                    </div>}
                    <img
                        src={productData?.thumb || no_image}
                        alt=''
                        className='w-[243px] h-[243px] object-contain'
                    />
                    <img src={isNew ? label : trending} alt='' className='w-[70px] h-[25px] absolute top-0 right-0' />
                </div>
                <div className='flex flex-col items-start gap-1 w-full'>
                    <span className='line-clamp-1'>{productData.title}</span>
                    <span className='flex'>{renderStar(productData.totalRating)}</span>
                    <span className=''>{formatMoney(productData.price)}</span>
                </div>
            </div>
        </div>
    )
}

export default Product