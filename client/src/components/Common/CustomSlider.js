import { memo } from 'react'

import Slider from 'react-slick';
import { Product } from 'components'

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const CustomSlider = ({ products, active, normal }) => {
    return (
        <div className=''>
            {products && <Slider {...settings}>
                {products?.map(item => (
                    <Product
                        pid={item.id}
                        key={item._id}
                        productData={item}
                        isNew={active === 1 ? true : false}
                        normal={normal}
                    />
                ))}
            </Slider>}
        </div>
    )
}

export default memo(CustomSlider)