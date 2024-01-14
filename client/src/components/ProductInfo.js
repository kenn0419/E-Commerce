import React, { memo, useState } from 'react'
import { productTabs } from '../ultils/contants'


const ProductInfo = () => {
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
            </div>
            <div className='w-full border p-3s flex justify-center'>
                <span className='text-sm text-gray-500'>
                    {productTabs.find(tab => activeTab === tab.id)?.content}
                </span>
            </div>
        </div>
    )
}

export default memo(ProductInfo)