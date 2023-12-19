import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, TopHeader } from '../../components';
const Public = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <TopHeader />
            <Header />
            <Navigation />
            <div className="w-main">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Public;