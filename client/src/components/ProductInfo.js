import React, { memo, useCallback, useState } from 'react'
import { productTabs } from '../ultils/contants'
import { Button, VoteBar, VoteOptions } from './';
import { renderStar } from '../ultils/helper';
import { useDispatch } from 'react-redux';
import { showModal } from '../store/app/appSlice';


const ProductInfo = ({ totalRatings, totalCount, nameProduct }) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(1);
    return (
        <div>
            <div className='flex items-center gap-1 relative bottom-[-1.3px]'>
                {productTabs.map(tab =>
                (
                    <span
                        key={tab.id}
                        className={`py-2 px-4 bg-gray-200 ${activeTab === tab.id && 'bg-white border-b-0'} border cursor-pointer text-[15px]`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.name}
                    </span>
                ))}
                <span
                    className={`py-2 px-4 bg-gray-200 ${activeTab === 5 && 'bg-white border-b-0'} border cursor-pointer text-[15px] uppercase`}
                    onClick={() => setActiveTab(5)}
                >
                    Customer Reviews
                </span>
            </div>
            <div className='w-full border p-4 text-sm text-gray-500'>
                {productTabs.find(tab => activeTab === tab.id)?.content}
                {activeTab === 5 && <div className=' p-4'>
                    <div className='flex'>
                        <div className='flex-4 border-r border-gray-200 flex flex-col items-center justify-center'>
                            <span className='text-2xl font-semibold text-gray-800'>{`${totalRatings}/5`}</span>
                            <span className='flex gap-2 py-2'>{renderStar(totalRatings)?.map((item, index) => (
                                <span key={index}>{item}</span>
                            ))}
                            </span>
                            <span className='underline text-base'>{`${totalCount} reviews`}</span>
                        </div>
                        <div className='flex-6 flex flex-col p-4 gap-2'>
                            {Array.from(Array(5).keys()).reverse().map(item => (
                                <VoteBar
                                    key={item}
                                    number={item + 1}
                                    ratingCount={2}
                                    ratingTotal={5}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='p-4 flex justify-center items-center flex-col'>
                        <span>How would you rate this product?</span>
                        <Button handleOnClick={() => dispatch(showModal({ isShowModal: true, modalChildren: <VoteOptions nameProduct={nameProduct} /> }))}>Rate now!</Button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default memo(ProductInfo)