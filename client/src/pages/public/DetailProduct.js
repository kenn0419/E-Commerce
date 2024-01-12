import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis';
import Breadcrumbs from '../../components/Breadcrumbs';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState({});
    const fetchDetailProduct = async () => {
        const response = await apiGetProduct(pid);
        if (response.success) {
            setProduct(response.productData);
        }
    }

    useEffect(() => {
        fetchDetailProduct();
    }, [pid])
    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>{title}</h3>
                    <Breadcrumbs title={title} category={category} />
                </div>
            </div>
            <div className='w-main mx-auto mt-4 flex gap-3'>
                <div className='w-2/5 flex flex-col gap-4'>
                    <div className='w-[458px] h-[458px] border'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: product.images
                            },
                            largeImage: {
                                src: product?.images,
                                width: 1200,
                                height: 1200
                            }
                        }} />
                    </div>
                    <div className='w-[458px]'>
                        {product && <Slider {...settings}>
                            {product?.images?.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt='' className='w-[143px] h-[143px] object-contain border' />
                                </div>
                            ))}
                        </Slider>}
                    </div>
                </div>
                <div className='w-2/5'>
                    price
                </div>
                <div className='w-1/5'>
                    Bonus
                </div>
            </div>
        </div>
    )
}

export default DetailProduct