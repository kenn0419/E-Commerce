import React, { memo } from 'react'

const Button = ({ children, handleOnClick, style, fw, type = 'button' }) => {
    return (
        <button
            type={type}
            className={style ? style : `p-2 round-md text-white bg-hover font-semibold rounded-md my-2 ${fw}`}
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {children}
        </button>
    )
}

export default memo(Button);