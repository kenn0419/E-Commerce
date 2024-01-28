import React, { memo, useCallback, useState } from 'react'
import { productTabs } from '../ultils/contants'
import { Button, Comment, VoteBar, VoteOptions } from './';
import { renderStar } from '../ultils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/app/appSlice';
import { apiRatings } from '../apis';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from '../ultils/path';


const ProductInfo = ({ totalRatings, ratings, nameProduct, pid, reRender }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, token } = useSelector(state => state.user);
    const [activeTab, setActiveTab] = useState(1);
    const handleSubmitVote = async ({ comment, star }) => {
        if (!comment || !pid || !star) {
            toast.error('Please vote when click submit');
            return;
        }
        const response = await apiRatings({ star, comment, pid, updatedAt: Date.now() })
        if (response.success) {
            toast.success(response.message);
            reRender();
            dispatch(showModal({
                isShowModal: false,
                modalChildren: null
            }))
        }
    }
    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Login to rate the product',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Login',
                title: 'Oops!',
                showCancelButton: true,
                showConfirmButton: true
            }).then((rs) => {
                if (rs.isConfirmed) {
                    navigate(`/${path.LOGIN}`)
                }
            })
        } else {
            dispatch(showModal({
                isShowModal: true,
                modalChildren: <VoteOptions
                    nameProduct={nameProduct}
                    handleSubmitVote={handleSubmitVote}
                />
            }))
        }
    }
    return (
        <div>
            <div className='flex items-center gap-1 relative bottom-[-1.3px]'>
                {productTabs.map(tab =>
                (
                    <span
                        key={tab.id}
                        className={`py-2 px-4 bg-gray-200 ${activeTab === tab.id && 'bg-white border-b-0'} border cursor-pointer text-[15px]`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.name}
                    </span>
                ))}

            </div>
            <div className='w-full border p-4 text-sm text-gray-500 min-h-[300px]'>
                {productTabs.find(tab => activeTab === tab.id)?.content}
            </div>
            <div className='w-main mt-5'>
                <div className='flex'>
                    <div className='flex-4 border-r border-gray-200 flex flex-col items-center justify-center'>
                        <span className='text-2xl font-semibold text-gray-800'>{`${totalRatings}/5`}</span>
                        <span className='flex gap-2 py-2'>{renderStar(totalRatings)?.map((item, index) => (
                            <span key={index}>{item}</span>
                        ))}
                        </span>
                        <span className='underline text-base'>{`${ratings?.length} reviews`}</span>
                    </div>
                    <div className='flex-6 flex flex-col p-4 gap-2'>
                        {Array.from(Array(5).keys()).reverse().map(item => (
                            <VoteBar
                                key={item}
                                number={item + 1}
                                ratingCount={ratings?.length}
                                ratingTotal={ratings?.filter(rating => rating.star === item + 1)?.length}
                            />
                        ))}
                    </div>
                </div>
                <div className='p-4 flex justify-center items-center flex-col'>
                    <span>How would you rate this product?</span>
                    <Button handleOnClick={handleVoteNow}
                    >
                        Rate now!
                    </Button>
                </div>
                <div>
                    {ratings?.map(item => (
                        <Comment
                            key={item.id}
                            star={item.star}
                            updatedAt={item.updatedAt}
                            comment={item.comment}
                            name={`${item.postedBy?.lastname} ${item?.postedBy?.firstname}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(ProductInfo)