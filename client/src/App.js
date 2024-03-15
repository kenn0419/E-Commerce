import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Home, Public, Blog, DetailProduct, Service, Products, FAQ, FinalRegister, ResetPassword, DetailCart } from 'pages/public';
import path from 'ultils/path';
import { getCategory } from 'store/app/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cart, Modal } from 'components';
import { AdminLayout, CreateProduct, Dashboard, ManageOder, ManageProduct, ManageUser } from 'pages/admin';
import { Checkout, History, MemberLayout, MyCart, Personal, WishList } from 'pages/member';
import { showCart } from 'store/app/appSlice';

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren, isShowCart } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(getCategory());
  }, [])
  return (
    <div className="font-main h-screen">
      {isShowCart &&
        <div
          onClick={() => dispatch(showCart())}
          className='absolute inset-0 bg-overlay z-50 flex justify-end'>
          <Cart />
        </div>}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOG} element={<Blog />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.OUR_SERVICES} element={<Service />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDERS} element={<ManageOder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProduct />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<DetailCart />} />
          <Route path={path.WISHLIST} element={<WishList />} />
          <Route path={path.HISTORY} element={<History />} />
        </Route>
        <Route path={path.CHECKOUT} element={<Checkout />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div >

  );
}

export default App;
