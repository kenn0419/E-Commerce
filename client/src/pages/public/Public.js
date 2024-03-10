import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, TopHeader } from 'components';
const Public = () => {
    return (
        <div className="max-h-screen overflow-y-auto flex flex-col items-center">
            <TopHeader />
            <Header />
            <Navigation />
            <div className="w-full flex items-center justify-center flex-col">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Public;