import { useSelector } from 'react-redux';
import icons from '../../ultils/icon';
import { Sidebar, Baner, BestSeller, DealDaily, FeartureProduct, CustomSlider } from '../../components';

const Home = () => {
    const { MdOutlineKeyboardArrowRight } = icons;
    const { newProducts } = useSelector(state => state.productReducer)
    const { categories } = useSelector(state => state.appReducer)
    return (
        <>
            <div className='w-main flex'>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Baner />
                    <BestSeller />
                </div>
            </div>
            <div className='mt-7'>
                <FeartureProduct />
            </div>
            <div className='my-8 w-full'>
                <h3 className='uppercase text-[20px] font-semibold py-[15px] border-hover border-b-2'>New Arrivals</h3>
                <div className='mt-7 mx-[-10px]'>
                    <CustomSlider
                        products={newProducts}
                    />
                </div>
            </div>
            <div>
                <h3 className='uppercase text-[20px] font-semibold py-[15px] border-hover border-b-2'>Hot collections</h3>
                <div className='flex flex-wrap mr-[-20px] mt-5 '>
                    {categories?.map(category => (
                        <div
                            key={category._id}
                            className='w-[30%] mr-[20px] border flex flex-auto mb-5 p-4 gap-3  min-h-[200px]'
                        >
                            <img src={category.image} alt='' className='w-[144px] h-[129px] flex-1 object-contain' />
                            <div className='flex flex-col flex-1 gap-[2px]'>
                                <span className='uppercase font-semibold'>{category.title}</span>
                                {category.brand?.map((item, index) => (
                                    <a href='/' className='flex gap-2 items-center text-gray-400 hover:text-hover text-sm'>
                                        <span><MdOutlineKeyboardArrowRight /></span>
                                        <span>{item}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className='uppercase text-[20px] font-semibold py-[15px] border-hover border-b-2'>Blog posts    </h3>
            </div>
            <div className='w-full h-[500px] mt-5 bg-hover'>Footer</div>
        </>
    )
}

export default Home;