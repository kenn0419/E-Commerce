import clsx from 'clsx';
import React, { memo } from 'react'

const Button = ({ children, handleOnClick, style, fw, type = 'button', backGround = 'bg-hover' }) => {
    return (
        <button
            type={type}
            className={clsx('p-2 round-md text-white font-semibold rounded-md my-2', fw && 'w-full', style, backGround)}
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {children}
        </button>
    )
}

export default memo(Button);