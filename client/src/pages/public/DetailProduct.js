import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis';
import Breadcrumbs from '../../components/Breadcrumbs';

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState({});
    const fetchDetailProduct = async () => {
        const response = await apiGetProduct(pid);
        if (response.success) {
            setProduct(response.productData);
        }
    }
    useEffect(() => {
        fetchDetailProduct();
    }, [])
    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>{title}</h3>
                    <Breadcrumbs title={title} category={category} />
                </div>
            </div>
        </div>
    )
}

export default DetailProduct