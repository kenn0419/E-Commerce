import React, { memo, useCallback, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumbs, Product, SearchItem, SelectField } from '../../components';
import { apiGetProducts } from '../../apis';
import Masonry from 'react-masonry-css'
import { sorts } from '../../ultils/contants';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

const Products = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [params] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('');
    const [activeClick, setActiveClick] = useState();
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
    const changeValue = useCallback((value) => {
        setSort(value);
    }, [sort])
    useEffect(() => {
        let param = [];
        for (let i of params.entries()) {
            param.push(i);
        }
        const queries = {};
        for (let i of param) {
            queries[i[0]] = i[1];
        }
        let priceQuery = {};
        if (queries.from && queries.to) {
            priceQuery = {
                '$and': [
                    { price: { gte: queries.from } },
                    { price: { lte: queries.to } },
                ]
            }
        }
        if (queries.from) {
            queries.price = { gte: queries.from };
        }
        if (queries.to) {
            queries.price = { lte: queries.to };
        }
        delete queries.from;
        delete queries.to;
        fetchApiProductsByCategory({ ...priceQuery, ...queries });
    }, [params])
    useEffect(() => {
        if (sort) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({ sort }).toString(),
            })
        } else {
            navigate(`/${category}`);
        }
    }, [sort])
    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex flex-col justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>{category}</h3>
                    <Breadcrumbs category={category} />
                </div>
            </div>
            <div className='w-main mx-auto mt-5'>
                <div className='flex justify-between p-2 border items-center'>
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
                    <div className='w-1/5'>
                        <span className='text-base text-[#505050] font-semibold'>Sort by</span>
                        <div>
                            <SelectField
                                value={sort}
                                options={sorts}
                                changeValue={changeValue}
                            />
                        </div>
                    </div>
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

export default memo(Products)