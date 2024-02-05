import React, { memo } from 'react'
import usePagination from 'hooks/usePagination'
import { PagiItem } from './'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ totalCount }) => {
    const [params] = useSearchParams();
    const pagination = usePagination(totalCount, 2);
    const range = () => {
        const currentPage = +params.get('page') || 1;
        const pageSize = +process.env.REACT_APP_PRODUCT_LIMIT || 10;
        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalCount);
        return `${start} - ${end}`
    }
    return (
        <div className='flex w-main justify-between items-center'>
            <span className='italic text-sm'>{`Show products ${range()} of ${totalCount}`}</span>
            <div className='flex'>
                {pagination?.map(item => (
                    <PagiItem
                        key={item}
                    >
                        {item}
                    </PagiItem>
                ))}
            </div>
        </div>
    )
}

export default memo(Pagination)