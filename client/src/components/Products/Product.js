import { memo, useState } from 'react';
import no_image from 'assets/no_image.png';
import label from 'assets/new.png';
import trending from 'assets/trending.png';
import { formatMoney } from 'ultils/helper';
import { renderStar } from 'ultils/helper';
import { Button, SelectOption } from '..';
import icons from 'ultils/icon';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from 'store/app/appSlice';
import { DetailProduct } from 'pages/public';
import { apiAddIntoCart, apiRemoveProductFromCart, apiUpdateWishList } from 'apis';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';
import path from 'ultils/path';
import Swal from 'sweetalert2';
import clsx from 'clsx';

const Product = ({ productData, isNew, pid, normal, className }) => {
    const dispatch = useDispatch();
    const { current } = useSelector(state => state.user);
    const navigate = useNavigate();
    const { FaHeart, FaEye, FaCartArrowDown, BsFillCartCheckFill } = icons;
    const [isShowOptions, setIsShowOptions] = useState(false);
    const handleOptionsClick = async (e, option) => {
        e.stopPropagation();
        if (option === 'QUICK_VIEW') {
            dispatch(showModal({
                isShowModal: true,
                modalChildren: <DetailProduct isQuickView data={{ pid: productData._id, category: productData.category }} />
            }));
        } else if (option === 'CART') {
            if (!current) {
                Swal.fire({
                    title: 'Oops!!!',
                    text: 'Please login to add into cart',
                    showCancelButton: true,
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Login'
                }).then(res => {
                    if (res.isConfirmed) {
                        navigate(`/${path.LOGIN}`);
                    }
                })
            } else {
                if (current?.cart?.some(item => item.product._id === productData._id)) {
                    const response = await apiRemoveProductFromCart(productData._id);
                    if (response.success) {
                        toast.success(response.message);
                        dispatch(getCurrent())
                    } else {
                        toast.error(response.message);
                    }
                } else {
                    const response = await apiAddIntoCart({
                        pid: productData._id,
                        color: productData.color,
                        title: productData.title,
                        thumbNail: productData.thumb,
                        price: productData.price
                    });
                    if (response.success) {
                        toast.success(response.message);
                        dispatch(getCurrent())
                    } else {
                        toast.error(response.message);
                    }
                }
            }
        } else {
            const response = await apiUpdateWishList(productData._id);
            if (response.success) {
                dispatch(getCurrent());
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        }
    }
    return (
        <div className={clsx('w-full text-base px-[10px]', className)}>
            <div
                className='w-full border p-[15px] flex flex-col items-center gap-2'
                onClick={() => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
                onMouseEnter={e => setIsShowOptions(true)}
                onMouseLeave={e => setIsShowOptions(false)}
            >
                <div className='w-full relative cursor-pointer'>
                    {isShowOptions && <div
                        className='absolute bottom-[-10px] z-30 flex justify-center w-full gap-2 animate-slide-top'
                    >
                        <span title='Quick View' onClick={(e) => handleOptionsClick(e, 'QUICK_VIEW')}>
                            <SelectOption icon={<FaEye />} />
                        </span>
                        <span title='Add Carts' onClick={(e) => handleOptionsClick(e, 'CART')}>
                            <SelectOption icon={current?.cart?.some(item => item.product._id === productData._id) ? <BsFillCartCheckFill /> : <FaCartArrowDown />} />
                        </span>
                        <span title='Wishlist' onClick={(e) => handleOptionsClick(e, 'WISHLIST')}>
                            <SelectOption icon={<FaHeart color={current?.wishList?.some(item => item._id === productData._id) ? 'red' : 'gray'} />} />
                        </span>

                    </div>}
                    <img
                        src={productData?.thumb || no_image}
                        alt=''
                        className='w-[243px] h-[243px] object-contain'
                    />
                    {!normal && <img src={isNew ? label : trending} alt='' className='w-[70px] h-[25px] absolute top-0 right-0' />}
                </div>
                <div className='flex flex-col items-start gap-1 w-full'>
                    <span className='line-clamp-1'>{productData.title}</span>
                    <span className='flex'>{renderStar(productData?.totalRating)?.map((item, index) => <span key={index}>{item}</span>)}</span>
                    <span className=''>{formatMoney(productData.price)}</span>
                </div>
            </div>
        </div >
    )
}

export default memo(Product)