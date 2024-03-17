import { useEffect, useState, memo } from 'react';
import icons from 'ultils/icon';
import { apiGetProducts } from 'apis/product';
import no_image from 'assets/no_image.png';
import { formatMoney, renderStar, secondsToHms } from 'ultils/helper'
import { CountDown } from 'components';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getDealDaily } from 'store/product/productSlice';

let idInteval;
const DealDaily = () => {
    const dispatch = useDispatch();
    const { FaStar, TiThMenu } = icons;
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false);
    const { dealDaily } = useSelector(state => state.product);
    const fetchDealDaily = async () => {
        const response = await apiGetProducts({ sort: '-totalRating', limit: 20 });
        if (response.success) {
            const product = response.products[Math.round(Math.random() * response.products.length)]
            dispatch(getDealDaily({
                data: product,
                time: Date.now() + 24 * 3600 * 1000
            }));
            // const time = `${moment(dealDaily.time).format('MM/DD/YYYY')} 0:00:00`;
            // const s = new Date(time).getTime() - new Date().getTime() + 24 * 3600 * 1000;
            // const number = secondsToHms(s);

            // setHour(number.h);
            // setMinute(number.m);
            // setSecond(number.s);
        } else {
            // setHour(0);
            // setMinute(59);
            // setSecond(59);
        }
    }
    useEffect(() => {
        if (dealDaily.time) {
            const remainTime = dealDaily.time - Date.now();
            const time = secondsToHms(remainTime);
            setHour(time.h);
            setMinute(time.m);
            setSecond(time.s);
        }
    }, [dealDaily])
    useEffect(() => {
        clearInterval(idInteval);
        if (moment(moment(dealDaily?.time).format('MM/DD/YYYY')).isBefore(moment())) {
            fetchDealDaily();
        }
    }, [expireTime])

    useEffect(() => {
        idInteval = setInterval(() => {
            if (second > 0) {
                setSecond(prev => prev - 1);
            } else {
                if (minute > 0) {
                    setMinute(prev => prev - 1);
                    setSecond(59);
                } else {
                    if (hour > 0) {
                        setHour(prev => prev - 1);
                        setMinute(59);
                        setSecond(59);
                    } else {
                        setExpireTime(!expireTime);
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(idInteval);
        }
    }, [hour, minute, second, expireTime])
    return (
        <div className='w-full border flex-auto'>
            <div className='flex justify-between items-center p-4 w-full'>
                <span className='flex-2'>
                    <FaStar size={20} color='#dd1111' />
                </span>
                <span className='uppercase flex-5 font-semibold text-[20px] flex justify-center text-gray-600'>Daily Deals</span>
                <span className='flex-3'></span>
            </div>
            <div className='w-full flex flex-col px-4 items-center gap-2 mt-4'>
                <img
                    src={dealDaily?.data?.thumb || no_image}
                    alt=''
                    className='w-full object-contain'
                />
                <span className='line-clamp-1'>{dealDaily?.data?.title}</span>
                <span className='flex'>{renderStar(dealDaily?.data?.totalRating)}</span>
                <span className=''>{formatMoney(dealDaily?.data?.price)}</span>
            </div>
            <div className='px-5 mt-4'>
                <div className='flex justify-center items-center gap-1 mb-3'>
                    <CountDown unit={'Hours'} number={hour} />
                    <CountDown unit={'Minutes'} number={minute} />
                    <CountDown unit={'Seconds'} number={second} />
                </div>
                <button
                    type='button'
                    className='flex gap-2 justify-center items-center w-full bg-hover p-3 text-white hover:bg-[#333] font-medium mt-4'
                >
                    <TiThMenu />
                    <span className='uppercase'>Options</span>
                </button>
            </div>
        </div>
    )
}

export default memo(DealDaily)