import axios from '../axios';

export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'POST',
    data,
    withCredentials: true,
})

export const apiFinalRegister = ({ token }) => axios({
    url: '/user/final-register/' + token,
    method: 'PUT',
    withCredentials: true,
})

export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'POST',
    data
})


export const apiForgotPassword = (data) => axios({
    url: '/user/forget-password',
    method: 'POST',
    data
})

export const apiResetPassword = (data) => axios({
    url: '/user/reset-password',
    method: 'PUT',
    data
})

export const apiGetCurrent = () => axios({
    url: '/user/current',
    method: 'GET',
})

export const apiGetUsers = (params) => axios({
    url: '/user',
    method: 'GET',
    params
})

export const apiUpdateUser = (data, uid) => axios({
    url: '/user/' + uid,
    method: 'PUT',
    data
})

export const apiDeleteUser = (uid) => axios({
    url: '/user/' + uid,
    method: 'DELETE',
})

export const apiUpdateCurrent = (data) => axios({
    url: '/user/current',
    method: 'PUT',
    data
})

export const apiAddIntoCart = (data) => axios({
    url: '/user/add-cart',
    method: 'PUT',
    data
})

export const apiRemoveProductFromCart = (pid, color) => axios({
    url: `/user/remove-cart/${pid}/${color}`,
    method: 'DELETE',
})