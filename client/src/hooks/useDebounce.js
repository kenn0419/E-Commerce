import React, { useEffect, useState } from 'react'

const useDebounce = (value, ms) => {
    const [debounce, setDebounce] = useState('');
    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            setDebounce(value)
        }, ms);
        return () => {
            clearTimeout(setTimeOutId);
        }
    }, [value, ms])
    return debounce;
}

export default useDebounce