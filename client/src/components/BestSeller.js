import { useEffect, useState } from 'react';
import { apiGetProducts } from '../apis/product'
import CustomSlider from './CustomSlider';
import { useDispatch, useSelector } from 'react-redux';
import { getNewProducts } from '../store/product/asyncAction';

const tabs = [
    {
        id: 1,
        name: 'Best Seller',
    },
    {
        id: 2,
        name: 'New Arrivals'
    }
]

const BestSeller = () => {
    const [newProduct, setNewProduct] = useState();
    const [bestSeller, setBestSeller] = useState();
    const [active, setActive] = useState(1);
    const [products, setProducts] = useState();
    const dispatch = useDispatch();

    const fetchProduct = async () => {
        const response = await apiGetProducts({ sort: '-sold' });
        if (response?.success) {
            setBestSeller(response.products);
            setProducts(response.products);
        }
    }
    useEffect(() => {
        fetchProduct();
        dispatch(getNewProducts());
    }, [])
    useEffect(() => {
        if (active === 1) {
            setProducts(bestSeller);
        }
        if (active === 2) {
            setProducts(newProduct);
        }
    }, [active])
    return (
        <div>
            <div className='flex py-4 text-[20px] ml-[-8px]'>
                {tabs.map(tab => (
                    <span
                        key={tab.id}
                        className={`font-semibold uppercase px-2 border-r cursor-pointer text-gray-400 ${active === tab.id ? 'text-gray-900' : ''}`}
                        onClick={() => setActive(tab.id)}
                    >
                        {tab.name}
                    </span>
                ))}
            </div>
            <div className='mt-4 mx-[-10px] border-t-2 border-hover pt-4'>
                <CustomSlider products={products} active={active} />
            </div>
            <div className='mt-4 flex gap-4 w-full '>
                <img
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657'
                    alt=''
                    className='flex-1 object-contain'
                />
                <img
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
                    alt=''
                    className='flex-1 object-contain'
                />
            </div>
        </div>
    )
}

export default BestSeller