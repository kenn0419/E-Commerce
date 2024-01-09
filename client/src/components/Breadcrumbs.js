import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import icons from '../ultils/icon';

const Breadcrumbs = ({ title, category }) => {
    const { MdOutlineKeyboardArrowRight } = icons;
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title }
    ];
    const breadcrumbs = useBreadcrumbs(routes);
    console.log(breadcrumbs);
    return (
        <div className='text-sm flex items-center gap-1'>
            {breadcrumbs?.filter(item => !item.match.route === false).map(({ match, breadcrumb }, index, self) => (
                <Link key={match.pathname} to={match.pathname} className='flex items-center hover:text-hover'>
                    <span className='capitalize'>{breadcrumb}</span>
                    {index !== self?.length - 1 && <MdOutlineKeyboardArrowRight />}
                </Link>
            ))}
        </div>
    )
}

export default memo(Breadcrumbs);