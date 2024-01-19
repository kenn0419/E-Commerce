import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumbs, Product, SearchItem } from '../../components';
import { apiGetProducts } from '../../apis';
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

const Products = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [activeClick, setActiveClick] = useState();
    const [params] = useSearchParams();
    const fetchApiProductsByCategory = async (queries) => {
        const response = await apiGetProducts(queries);
        if (response.success) {
            setProducts(response.products);
        }
    }
    const handleChangeActiveFilter = useCallback((name) => {
        if (name === activeClick) {
            setActiveClick(null);
        } else {
            setActiveClick(name);
        }
    }, [activeClick])
    useEffect(() => {
        let param = [];
        for (let i of params.entries()) {
            param.push(i);
        }
        const queries = {};
        for (let i of param) {
            queries[i[0]] = i[1];
        }
        fetchApiProductsByCategory(queries);
    }, [params])
    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex flex-col justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>{category}</h3>
                    <Breadcrumbs category={category} />
                </div>
            </div>
            <div className='w-main mx-auto mt-5'>
                <div className='flex justify-between p-2 border'>
                    <div className='w-4/5'>
                        <span className='text-base text-[#505050] font-semibold'>Filter by</span>
                        <div className='flex gap-1 mt-2'>
                            <SearchItem
                                name='Price'
                                activeClick={activeClick}
                                handleChangeActiveFilter={handleChangeActiveFilter}
                                type='input'
                            />
                            <SearchItem
                                name='Capacity'
                                activeClick={activeClick}
                                handleChangeActiveFilter={handleChangeActiveFilter}
                            />
                        </div>
                    </div>
                    <div className='w-1/5'>search</div>
                </div>
            </div>
            <div className='w-main mx-auto mt-5'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column"
                >
                    {products?.map(product => (
                        <Product
                            pid={product.id}
                            key={product._id}
                            productData={product}
                            normal={true}
                        />
                    ))}
                </Masonry>
            </div>
        </div>
    )
}

export default Products