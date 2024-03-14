import { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom'
import { apiAddIntoCart, apiGetProduct, apiGetProducts } from 'apis';
import { Breadcrumbs, Button, CustomSlider, ExtraInfo, ProductInfo, SelectQuantity } from 'components';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, renderStar } from 'ultils/helper';
import { extraInfo } from 'ultils/contants';
import DOMPurify from 'dompurify';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import path from 'ultils/path';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const DetailProduct = ({ isQuickView, data }) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { current } = useSelector(state => state.user);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [update, setUpdate] = useState(false);
    const [relativeProducts, setRelativeProducts] = useState([]);
    const [currentImage, setCurrentImage] = useState();
    const [variant, setVariant] = useState('');
    const [pid, setPid] = useState();
    const [category, setCategory] = useState();
    const [currentProduct, setCurrentProduct] = useState({
        title: '',
        color: '',
        images: [],
        price: '',
        thumb: ''
    })
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

    useEffect(() => {
        if (data) {
            setPid(data.pid);
            setCategory(data.category);
        } else if (params) {
            setPid(params.pid);
            setCategory(params.category);
        }
    }, [data, params])
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
    const handleAddIntoCart = async () => {
        if (!current) {
            Swal.fire({
                title: 'Oops!!!',
                text: 'Please login to add into cart',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Login'
            }).then(res => {
                if (res.isConfirmed) {
                    navigate({
                        pathname: `/${path.LOGIN}`,
                        search: createSearchParams({
                            redirect: location.pathname,
                        }).toString()
                    });
                }
            })
        } else {
            const response = await apiAddIntoCart({
                pid,
                quantity,
                thumbNail: currentProduct.thumb || product.thumb,
                title: currentProduct.title || product.title,
                color: currentProduct.color || product.color,
                price: currentProduct.price || product.price,
            });
            if (response.success) {
                toast.success(response.message);
                dispatch(getCurrent())
            } else {
                toast.error(response.message);
            }
        }
    }
    useEffect(() => {
        if (variant) {
            setCurrentProduct({
                title: product?.variant?.find(item => item.sku === variant)?.title,
                color: product?.variant?.find(item => item.sku === variant)?.color,
                price: product?.variant?.find(item => item.sku === variant)?.price,
                images: product?.variant?.find(item => item.sku === variant)?.images,
                thumb: product?.variant?.find(item => item.sku === variant)?.thumb,
            })
        } else {
            setCurrentProduct({
                title: '',
                color: '',
                images: [],
                price: '',
                thumb: ''
            })
        }
    }, [variant])
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
        <div className={clsx('w-full')}>
            {!isQuickView && <div className='h-[81px] bg-gray-100 flex justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>{currentProduct.title || product.title}</h3>
                    <Breadcrumbs title={currentProduct.title || product.title} category={category} />
                </div>
            </div>}
            <div
                onClick={e => e.stopPropagation()}
                className={clsx('bg-white mx-auto mt-4 flex gap-3', isQuickView ? 'max-w-[900px] gap-16 p-8 max-h-[100vh] overflow-auto' : 'w-main')}
            >
                <div className={clsx('flex flex-col gap-4', isQuickView ? 'w-1/2' : 'w-2/5')}>
                    <div className={clsx('border flex items-center overflow-hidden', isQuickView ? 'w-full h-[400px]' : 'w-[458px] h-[458px]')}>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: '',
                                isFluidWidth: true,
                                src: currentProduct.thumb || currentImage
                            },
                            largeImage: {
                                src: currentProduct.thumb || currentImage,
                                width: 1800,
                                height: 1500
                            }
                        }} />
                    </div>
                    {!isQuickView && <div className='w-[472px] mt-4'>
                        {<Slider {...settings}>
                            {currentProduct.images.length === 0 && product?.images?.map((item, index) => (
                                <div key={index}>
                                    <img
                                        src={item}
                                        alt=''
                                        className='w-[143px] h-[143px] object-contain border'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClickImage(item)
                                        }}
                                    />
                                </div>
                            ))}
                            {currentProduct.images.length > 0 && currentProduct?.images?.map((item, index) => (
                                <div key={index}>
                                    <img
                                        src={item}
                                        alt=''
                                        className='w-[143px] h-[143px] object-contain border'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClickImage(item)
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>}
                    </div>
                    }
                </div>
                <div className={clsx('flex flex-col', isQuickView ? 'w-1/2' : 'w-2/5')}>
                    <h3 className='text-[30px] font-semibold'>{formatMoney(currentProduct.price || product.price)}</h3>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-start mt-4'>
                            {renderStar(product.totalRating, 18).map((item, index) => (<span key={index}>{item}</span>))}
                            <span className='text-sm pl-2'>{product.ratings?.length} reviews</span>
                        </div>
                        <span className='text-sm text-gray-500 mt-4'>{`(Sold: ${product.sold} products)`}</span>
                    </div>
                    <div className='mt-5'>
                        <ul className='px-5'>
                            {product?.description?.length > 1 && product?.description?.map(item => (
                                <li key={item} className='list-square leading-6 text-[#6b6b6b] text-sm'>{item}</li>
                            ))}
                            {product?.description?.length === 1 &&
                                <li
                                    className='list-square leading-6 text-[#6b6b6b] text-sm'
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description[0]) }}>
                                </li>
                            }
                        </ul>
                        <div className='my-4 flex gap-4'>
                            <span className='font-bold'>Color:</span>
                            <div className='flex flex-wrap gap-4 items-center w-full'>
                                <div
                                    onClick={() => setVariant()}
                                    className={clsx('flex items-center gap-2 border p-1 cursor-pointer', !variant ? 'border-red-500' : ' border-gray-300')}
                                >
                                    <img src={product.thumb} alt='' className='w-10 h-10 rounded-sm object-cover' />
                                    <span className='flex flex-col gap-2'>
                                        <span className='text-sm text-gray-500'>{product.color}</span>
                                        <span className='text-sm text-gray-500'>{formatMoney(product.price)}</span>
                                    </span>
                                </div>
                                {product?.variant?.map(item => (
                                    <div key={item.sku}
                                        onClick={() => setVariant(item.sku)}
                                        className={clsx('flex items-center gap-2 border p-1 cursor-pointer', variant === item.sku ? 'border-red-500' : ' border-gray-3  00')}
                                    >
                                        <img src={item.thumb} alt='' className='w-10 h-10 rounded-sm object-cover' />
                                        <span className='flex flex-col gap-2'>
                                            <span className='text-sm text-gray-500'>{item.color}</span>
                                            <span className='text-sm text-gray-500'>{formatMoney(item.price)}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='text-sm flex flex-col gap-5'>
                            <SelectQuantity
                                quantity={quantity}
                                handleQuantiTy={handleQuantiTy}
                                handleChangeQuantity={handleChangeQuantity}
                                remainQuantity={product.quantity}
                            />
                            <div className='p-2'>
                                <Button
                                    children='Add to Cart'
                                    fw={'w-full'}
                                    handleOnClick={handleAddIntoCart}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {!isQuickView && <div className='w-1/5'>
                    {extraInfo.map(item => <ExtraInfo title={item.title} sub={item.sub} iconImage={<item.icon color='white' size={18} />} id={item.id} />)}
                </div>}
            </div>
            {!isQuickView && <>
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
            </>}
        </div>
    )
}

export default DetailProduct