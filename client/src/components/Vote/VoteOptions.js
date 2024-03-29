import { memo, useEffect, useRef, useState } from 'react'
import logo from 'assets/logo.png'
import { votReview } from 'ultils/contants';
import icons from 'ultils/icon';
import { Button } from 'components';

const VoteOptions = ({ nameProduct, handleSubmitVote }) => {
    const modalRef = useRef();
    const [chooseStar, setChooseStar] = useState(0);
    const [comment, setComment] = useState('');
    const { FaStar } = icons;
    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])
    return (
        <div onClick={e => e.stopPropagation()} ref={modalRef} className='bg-white w-[700px] p-4 flex flex-col gap-4 justify-center items-center rounded-md'>
            <img src={logo} alt='' className='w-[300px] object-contain my-8' />
            <h2 className='text-base '>{`Rating product ${nameProduct}`}</h2>
            <textarea
                cols={3}
                rows={7}
                className='border w-full outline-none p-2 rounded-md placeholder:italic placeholder:text-sm'
                placeholder='Please share some experiences about the product'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            >
            </textarea>
            <div className='flex justify-center flex-col items-center gap-4'>
                <span className=''>How do you feel about this product?</span>
                <div className='flex gap-7'>
                    {votReview.map(item => (
                        <div
                            key={item}
                            className='w-[90px] py-2 flex items-center justify-center flex-col gap-2 bg-gray-200 rounded-sm cursor-pointer'
                            onClick={() => setChooseStar(item.id)}
                        >
                            {(Number(chooseStar) && chooseStar >= item.id) ? <FaStar color='orange' /> : <FaStar color='gray' />}
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button
                fw='w-full'
                handleOnClick={() => handleSubmitVote({ comment, star: chooseStar })}
            >
                Submit
            </Button>
        </div>
    )
}

export default memo(VoteOptions)