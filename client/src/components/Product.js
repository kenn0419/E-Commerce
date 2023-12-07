import React from 'react';
import no_image from '../assets/no_image.png';
import label from '../assets/label.png';
import labelBlue from '../assets/labelBlue.png';
import { formatMoney } from '../ultils/helper';

const Product = ({ productData, isNew }) => {
    return (
        <div className='w-full text-base px-[10px]'>
            <div className='w-full border p-[15px] flex flex-col items-center'>
                <div className='w-full relative'>
                    <img
                        src={productData?.thumb || no_image}
                        alt=''
                        className='w-[243px] h-[243px] object-contain'
                    />
                    <img src={isNew ? label : labelBlue} alt='' className='absolute top-[-18px] left-[-35px] w-[80px] h-[35px] object-cover bg-transparent z-20' />
                    <span className='absolute top-[-18px] left-[-15px] z-20 text-white font-light uppercase'>{isNew ? 'New' : 'Deal'}</span>
                </div>
                <div className='flex flex-col gap-2 items-start gap-1 w-full'>
                    <span className='line-clamp-1'>{productData.title}</span>
                    <span className=''>{formatMoney(productData.price)}</span>
                </div>
            </div>
        </div>
    )
}

export default Product