import React, { memo } from 'react'
import { HashLoader } from 'react-spinners'

const Loading = () => {
    return (
        <HashLoader color='white' />
    )
}

export default memo(Loading)