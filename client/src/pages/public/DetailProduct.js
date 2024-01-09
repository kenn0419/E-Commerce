import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis';

const DetailProduct = () => {
    const { pid, title } = useParams();
    const fetchDetailProduct = async () => {
        const response = await apiGetProduct(pid);
        console.log(response);
    }
    useEffect(() => {
        fetchDetailProduct();
    }, [])
    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>{title}</h3>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct