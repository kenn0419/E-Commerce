import React from 'react'

const Button = ({ name, handleOnClick, style, iconsBefore, iconsAfter, fw }) => {
    return (
        <button
            type='button'
            className={style ? style : `px-4 py-2 round-md text-white bg-hover font-semibold rounded-md my-2 ${fw}`}
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {iconsBefore}
            <span>{name}</span>
            {iconsAfter}
        </button>
    )
}

export default Button