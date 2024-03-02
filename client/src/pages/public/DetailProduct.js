import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts } from 'apis';
import { Breadcrumbs, Button, CustomSlider, ExtraInfo, ProductInfo, SelectQuantity } from 'components';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, renderStar } from 'ultils/helper';
import { extraInfo } from 'ultils/contants';
import DOMPurify from 'dompurify';

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
    const [update, setUpdate] = useState(false);
    const [relativeProducts, setRelativeProducts] = useState([]);
    const [currentImage, setCurrentImage] = useState();
    const fetchDetailProduct = async () => {
        const response = await apiGetProduct(pid);
        if (response.success) {
            setProduct(response.productData);
            setCurrentImage(response?.productData.thumb);
        }
    }
    const fetchRelativeProducts = async () => {
        const response = await apiGetProducts({ category: category });
        if (response.success) {
            setRelativeProducts(response.products);
        }
    }
    const handleClickImage = (item) => {
        setCurrentImage(item);
    }
    const handleQuantiTy = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) return;
        setQuantity(number);
    }, [quantity])
    const reRender = useCallback(() => {
        setUpdate(!update);
    }, [update])
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
        if (pid) {
            fetchDetailProduct();
            fetchRelativeProducts();
        }
    }, [pid])
    useEffect(() => {
        if (pid) {
            fetchDetailProduct();
            fetchRelativeProducts();
        }
    }, [update])
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
                    <div className='w-[458px] h-[458px] border overflow-hidden'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: '',
                                isFluidWidth: true,
                                src: currentImage
                            },
                            largeImage: {
                                src: currentImage,
                                width: 1200,
                                height: 1200
                            }
                        }} />
                    </div>
                    <div className='w-[458px]'>
                        <Slider {...settings}>
                            {product?.images?.map((item, index) => (
                                <img
                                    src={item}
                                    alt=''
                                    className='h-[143px] w-[143px] object-contain border cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClickImage(item)
                                    }}
                                />
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='w-2/5 flex flex-col'>
                    <h3 className='text-[30px] font-semibold'>{formatMoney(product.price)}</h3>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-start mt-4'>
                            {renderStar(product.totalRating, 18).map((item, index) => (<span key={index}>{item}</span>))}
                            <span className='text-sm pl-2'>{product.ratings?.length} reviews</span>
                        </div>
                        <span className='text-sm text-gray-500 mt-4'>{`(Sold: ${product.sold} products)`}</span>
                    </div>
                    <div className='mt-5'>
                        <ul className='px-5'>
                            {product.description.length > 1 && product.description?.map(item => (
                                <li key={item} className='list-square leading-6 text-[#6b6b6b] text-sm'>{item}</li>
                            ))}
                            {product.description.length === 1 && <li className='list-square leading-6 text-[#6b6b6b] text-sm' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description[0]) }}></li>}
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
                    {extraInfo.map(item => <ExtraInfo title={item.title} sub={item.sub} iconImage={<item.icon color='white' size={18} />} id={item.id} />)}
                </div>
            </div>
            <div className='w-main mx-auto mt-2'>
                <ProductInfo
                    totalRatings={product.totalRating}
                    ratings={product?.ratings}
                    nameProduct={product?.title}
                    pid={product?._id}
                    reRender={reRender}
                />
            </div>
            <div className='w-main mx-auto mt-4'>
                <h3 className='uppercase text-[20px] font-semibold py-[10px] border-hover border-b-2 mb-5'>OTHER CUSTOMERS ALSO BUY:</h3>
                <CustomSlider products={relativeProducts} normal={true} />
            </div>
        </div>
    )
}

export default DetailProduct