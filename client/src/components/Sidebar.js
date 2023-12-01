import React, { useEffect, useState } from 'react';
import { apiGetCategory } from '../apis/app';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [categories, setCategories] = useState();
    const fetchCategory = async () => {
        const response = await apiGetCategory();
        if (response.success) {
            setCategories(response.categoryList);
        }
    }
    useEffect(() => {
        fetchCategory();
    }, [])
    return (
        <div className='flex flex-col'>
            {categories.map(category => (
                <NavLink
                    className='px-5'
                >
                    {category.title}
                </NavLink>
            ))}
        </div>
    )
}

export default Sidebar