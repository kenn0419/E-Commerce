import React, { useEffect, useState } from 'react'
import { ProductCard } from './'
import { apiGetProducts } from '../apis'

const FeartureProduct = () => {
    const [products, setProducts] = useState();
    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 9, totalRating: 5 });
        if (response.success) {
            setProducts(response.products);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div className='w-full'>
            <h3 className='uppercase text-[20px] font-semibold py-[15px] border-hover border-b-2'>Feartured Products</h3>
            <div className='flex flex-wrap mt-5 mr-[-20px]'>
                {products?.map(product => (
                    <ProductCard
                        key={product._id}
                        productData={product}
                    />
                ))}
            </div>
            <div className='flex justify-between'>
                <img
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661'
                    alt=''
                    className='w-[50%] object-contain'
                />
                <div className='flex flex-col gap-4 justify-between w-[24%]'>
                    <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661' alt='' />
                    <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661' alt='' />
                </div>
                <img
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661'
                    alt=''
                    className='w-[24%]'
                />
            </div>
        </div>
    )
}

export default FeartureProduct