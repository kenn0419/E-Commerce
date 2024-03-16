import React, { memo } from 'react'
import usePagination from 'hooks/usePagination'
import { PagiItem } from 'components'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ totalCount }) => {
    const [params] = useSearchParams();
    const pagination = usePagination(totalCount, +params.get('page') || 1);
    const range = () => {
        const currentPage = +params.get('page') || 1;
        const pageSize = +process.env.REACT_APP_LIMIT || 12;
        const start = Math.min((currentPage - 1) * pageSize + 1, totalCount);
        const end = Math.min(currentPage * pageSize, totalCount);
        return `${start} - ${end}`
    }
    return (
        <div className='flex w-full justify-between items-center'>
            <span className='italic text-sm'>{`Show products ${range()} of ${totalCount}`}</span>
            <div className='flex'>
                {pagination?.map((item, index) => (
                    <PagiItem
                        key={index}
                    >
                        {item}
                    </PagiItem>
                ))}
            </div>
        </div>
    )
}

export default memo(Pagination)