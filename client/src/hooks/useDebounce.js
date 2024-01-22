import React, { useEffect, useState } from 'react'

const useDebounce = (value, ms) => {
    const [debounce, setDebounce] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setDebounce(value)
        }, ms);
    }, [value, ms])
    return (
        <div>useDebounce</div>
    )
}

export default useDebounce