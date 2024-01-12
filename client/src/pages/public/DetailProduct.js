import React, { memo, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis';
import { Breadcrumbs, Button, SelectQuantity } from '../../components';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, renderStar } from '../../ultils/helper';

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
    const [quantity, setQuantity] = useState(1);
    const fetchDetailProduct = async () => {
        const response = await apiGetProduct(pid);
        if (response.success) {
            setProduct(response.productData);
        }
    }
    const handleQuantiTy = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) return;
        setQuantity(number);
    }, [quantity])
    const handleChangeQuantity = useCallback((option) => {
        if (Number(quantity) === 1 && option === 'minus') {
            return;
        }
        if (option === 'minus') {
            setQuantity(prev => +prev - 1);

        } else {
            setQuantity(prev => +prev + 1);
        }
    }, [quantity])
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
                                alt: '',
                                isFluidWidth: true,
                                src: product?.thumb
                            },
                            largeImage: {
                                src: product?.thumb,
                                width: 1200,
                                height: 1200
                            }
                        }} />
                    </div>
                    <div className='w-[458px]'>
                        {<Slider {...settings}>
                            {product?.images?.map((item, index) => (
                                <div key={index}>
                                    <img src={item} alt='' className='w-[143px] h-[143px] object-contain border' />
                                </div>
                            ))}
                        </Slider>}
                    </div>
                </div>
                <div className='w-2/5 flex flex-col'>
                    <h3 className='text-[30px] font-semibold'>{formatMoney(product.price)}</h3>
                    <div className='flex items-start mt-4'>
                        {renderStar(product.totalRating, 18).map((item, index) => (<span key={index}>{item}</span>))}
                        <span className='text-sm pl-2'>{product.ratings?.length} reviews</span>
                    </div>
                    <span className='text-sm text-gray-500 mt-4'>{`Số lượng đã bán: ${product.sold} sản phẩm`}</span>
                    <div className='mt-5'>
                        <ul className='px-5'>
                            {product.description?.map(item => (
                                <li key={item} className='list-square leading-6 text-[#6b6b6b] text-sm '>{item}</li>
                            ))}
                        </ul>
                        <div className='text-sm flex flex-col gap-5'>
                            <SelectQuantity
                                quantity={quantity}
                                handleQuantiTy={handleQuantiTy}
                                handleChangeQuantity={handleChangeQuantity}
                                remainQuantity={product.quantity}
                            />
                            <Button
                                children='Add to Cart'
                                fw={'w-full'}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-1/5'>
                    Bonus
                </div>
            </div>
        </div>
    )
}

export default memo(DetailProduct)