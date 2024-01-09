import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Home, Public, Blog, DetailProduct, Service, Product, FAQ, FinalRegister, ResetPassword } from './pages/public';
import path from './ultils/path';
import { getCategory } from './store/app/asyncAction';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [])
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOG} element={<Blog />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.OUR_SERVICES} element={<Service />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.PRODUCT} element={<Product />} />
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
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
    </div>

  );
}

export default App;
