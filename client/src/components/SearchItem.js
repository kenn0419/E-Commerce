import { memo, useEffect, useState } from 'react'
import icons from '../ultils/icon'
import { colors } from '../ultils/contants';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { apiGetProducts } from '../apis'
import { formatMoney } from '../ultils/helper'
import useDebounce from '../hooks/useDebounce'
import { toast } from 'react-toastify';


const SearchItem = ({ name, activeClick, handleChangeActiveFilter, type = 'checkbox' }) => {
    const { IoIosArrowDown } = icons;
    const navigate = useNavigate();
    const { category } = useParams();
    const [selected, setSelected] = useState([]);
    const [highPrice, setHighPrice] = useState(0);
    const [price, setPrice] = useState({
        from: '',
        to: '',
    })
    const handleSelect = (e) => {
        const alreadySelect = selected.find(item => item === e.target.value);
        if (alreadySelect) {
            setSelected(prev => prev.filter(item => item !== alreadySelect));
        } else {
            setSelected(prev => [...prev, e.target.value])
        }
        handleChangeActiveFilter();
    }
    const fetchHighestPriceProducts = async () => {
        const response = await apiGetProducts({ sort: '-price', limit: 1 });
        if (response.success) {
            setHighPrice(response.products[0].price);
        }
    }
    useEffect(() => {
        if (selected.length > 0) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    color: selected.join(',')
                }).toString(),
            })
        } else {
            navigate(`/${category}`)
        }
    }, [selected])
    useEffect(() => {
        if (type === 'input') {
            fetchHighestPriceProducts();
        }
    }, [type])
    useEffect(() => {
        if (Number(price.from) > Number(price.to)) {
            toast.error('Price is invalid!!!');
        }
    }, [price])
    const debounceFrom = useDebounce(price.from, 500);
    const debounceTo = useDebounce(price.to, 500);
    useEffect(() => {
        const data = {};
        if (Number(price.from) > 0) {
            data.from = price.from;
        }
        if (Number(price.to) > 0) {
            data.to = price.to;
        }
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(data).toString(),
        })
    }, [debounceFrom, debounceTo])
    return (
        <div
            className='relative p-4 text-xs text-[#505050] border border-gray-800 flex justify-between items-center gap-4 cursor-pointer'
            onClick={() => handleChangeActiveFilter(name)}
        >
            {name}
            <IoIosArrowDown size={14} />
            {activeClick === name &&
                <div className='absolute top-[calc(100%+1px)] left-0 border bg-white min-h-[150px] z-50'>
                    {type === 'checkbox' && <div onClick={e => e.stopPropagation()}>
                        <div className='border-b border-gray-300'>
                            <div className='p-4 flex items-center justify-between gap-14'>
                                <span className='whitespace-nowrap'>{`${selected.length} selected`}</span>
                                <span
                                    className='underline cursor-pointer'
                                    onClick={(e) => {
                                        setSelected([]);
                                        e.stopPropagation();
                                        handleChangeActiveFilter();
                                    }}
                                >
                                    Reset
                                </span>
                            </div>
                        </div>
                        <div onClick={(e) => e.stopPropagation()} className='p-4'>
                            {colors.map((color, index) => (
                                <div className='flex items-center text-sm text-[#505050] capitalize py-2'>
                                    <input
                                        type='checkbox'
                                        id={color}
                                        value={color}
                                        checked={selected.some(item => item === color)}
                                        onChange={(e) => handleSelect(e)}
                                    />
                                    <label htmlFor={color} className='pl-3'>{color}</label>
                                </div>
                            ))}
                        </div>
                    </div>}
                    {type === 'input' && <div onClick={e => e.stopPropagation()}>
                        <div className='border-b border-gray-300 w-full'>
                            <div className='p-4 flex items-center justify-between gap-4'>
                                <span className='text-sm'>{`The highest price is ${formatMoney(highPrice)}`}</span>
                                <span
                                    className='underline cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPrice(prev => ({ ...prev, from: '', to: '' }));
                                        handleChangeActiveFilter();
                                    }}
                                >
                                    Reset
                                </span>
                            </div>
                        </div>
                        <div onClick={(e) => e.stopPropagation()} className='p-4 flex w-full items-center gap-2'>
                            <div className='flex text-sm gap-2 items-center'>
                                <label htmlFor='from'>$</label>
                                <input
                                    id="from"
                                    type='number'
                                    placeholder='From'
                                    className='border p-2 outline-none'
                                    value={price.from}
                                    onChange={(e) => setPrice(prev => ({ ...prev, from: e.target.value }))}
                                />
                            </div>
                            <div className='flex text-sm gap-2 items-center'>
                                <label htmlFor='to'>$</label>
                                <input
                                    id="to"
                                    type='number'
                                    placeholder='To'
                                    className='border p-2 outline-none'
                                    value={price.to}
                                    onChange={(e) => setPrice(prev => ({ ...prev, to: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>}
                </div>
            }
        </div>
    )
}

export default memo(SearchItem)