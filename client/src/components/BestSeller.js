import { useEffect, useState } from 'react';
import { apiGetProduct } from '../apis/product'
import Product from './Product';
import Slider from 'react-slick';

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

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const BestSeller = () => {
    const [newProduct, setNewProduct] = useState();
    const [bestSeller, setBestSeller] = useState();
    const [active, setActive] = useState(1);
    const [products, setProducts] = useState();

    const fetchProduct = async () => {
        const response = await Promise.all([apiGetProduct({ sort: '-createdAt' }), apiGetProduct({ sort: '-sold' })]);
        if (response[0]?.success) {
            setNewProduct(response[0].productList);
        }
        if (response[1]?.success) {
            setBestSeller(response[1].productList);
        }
        setProducts(response[1].productList);

    }
    useEffect(() => {
        fetchProduct();
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
                <Slider {...settings}>
                    {products?.map(item => (
                        <Product
                            pid={item.id}
                            key={item._id}
                            productData={item}
                            isNew={active === 1 ? true : false}
                        />
                    ))}
                </Slider>
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