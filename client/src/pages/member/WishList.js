import { Product } from 'components';
import React from 'react'
import { useSelector } from 'react-redux'

const WishList = () => {
    const { current } = useSelector(state => state.user);
    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center w-full'>
                <div className='w-full'>
                    <h3 className='font-semibold tracking-tighter text-3xl px-3 pb-3 border-b border-red-500'>My Wishlist</h3>
                </div>
            </div>
            <div className='p-4 flex flex-wrap gap-4 w-full'>
                {current.wishList.map(item => (
                    <div key={item._id} className='bg-white w-[300px] drop-shadow-sm flex flex-col py-3 gap-3'>
                        <Product
                            pid={item._id}
                            productData={item}
                            className={`bg-white`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WishList