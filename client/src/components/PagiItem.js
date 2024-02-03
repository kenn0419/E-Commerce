import React from 'react'
import clsx from 'clsx'

const PagiItem = ({ children }) => {
    return (
        <div className={clsx('w-10 h-10 flex justify-center cursor-pointer hover:bg-gray-300 hover:underline hover:rounded-full',
            !Number(children) && 'items-end pb-2', Number(children) && 'items-center')}
        >
            {children}
        </div>
    )
}

export default PagiItem