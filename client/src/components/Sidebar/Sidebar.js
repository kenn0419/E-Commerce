import { NavLink } from 'react-router-dom';
import { createSlug } from 'ultils/helper';
import { useSelector } from 'react-redux'
import { memo } from 'react';

const Sidebar = () => {
    const { categories } = useSelector(state => state.app);
    return (
        <div className='flex flex-col border'>
            {categories?.map(category => (
                <NavLink
                    key={category._id}
                    to={createSlug(category.title)}
                    className={({ isActive }) => isActive ?
                        'bg-main text-white px-5 hover:text-hover pt-[15px] pb-[14px] text-sm uppercase'
                        :
                        'px-5 hover:text-hover pt-[15px] pb-[14px] text-sm uppercase'
                    }
                >
                    {category.title}
                </NavLink>
            ))}
        </div>
    )
}

export default memo(Sidebar)