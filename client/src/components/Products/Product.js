import { memo, useState } from 'react';
import no_image from 'assets/no_image.png';
import label from 'assets/new.png';
import trending from 'assets/trending.png';
import { formatMoney } from 'ultils/helper';
import { renderStar } from 'ultils/helper';
import { SelectOption } from '..';
import icons from 'ultils/icon';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showModal } from 'store/app/appSlice';
import { DetailProduct } from 'pages/public';

const Product = ({ productData, isNew, pid, normal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { FaHeart, FaEye, TiThMenu } = icons;
    const [isShowOptions, setIsShowOptions] = useState(false);
    const handleOptionsClick = (e, option) => {
        e.stopPropagation();
        if (option === 'QUICK_VIEW') {
            dispatch(showModal({ isShowModal: true, modalChildren: <DetailProduct isQuickView data={{ pid: productData._id, category: productData.category }} /> }));
        } else if (option === 'MENU') {
            navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)
        } else {
            // navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)
        }
    }
    return (
        <div className='w-full text-base px-[10px]'>
            <div
                className='w-full border p-[15px] flex flex-col items-center gap-2'
                onClick={() => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
                onMouseEnter={e => setIsShowOptions(true)}
                onMouseLeave={e => setIsShowOptions(false)}
            >
                <div className='w-full relative'>
                    {isShowOptions && <div
                        className='absolute bottom-[-10px] z-30 flex justify-center w-full gap-2 animate-slide-top'
                    >
                        <span onClick={(e) => handleOptionsClick(e, 'QUICK_VIEW')}><SelectOption icon={<FaEye />} /></span>
                        <span onClick={(e) => handleOptionsClick(e, 'MENU')}><SelectOption icon={<TiThMenu />} /></span>
                        <span onClick={(e) => handleOptionsClick(e, 'WISHLIST')}><SelectOption icon={<FaHeart />} /></span>
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
        </div>
    )
}

export default memo(Product)