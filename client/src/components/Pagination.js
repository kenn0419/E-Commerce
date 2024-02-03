import React, { memo } from 'react'
import usePagination from '../hooks/usePagination'
import { PagiItem } from './'

const Pagination = ({ totalCount }) => {
    const pagination = usePagination(totalCount, 1);
    return (
        <div className='flex'>
            {pagination?.map(item => (
                <PagiItem
                    key={item}
                >
                    {item}
                </PagiItem>
            ))}
        </div>
    )
}

export default memo(Pagination)