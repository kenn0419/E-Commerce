import React, { useCallback, useState } from 'react'
import { InputField, Button } from '../../components'
import { apiLogin, apiRegister } from '../../apis';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { register } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: ''
    })
    const [isRegister, setIsRegister] = useState(false);
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: ''
        })
    }
    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload;
        if (isRegister) {
            const response = await apiRegister(payload);
            if (response.success) {
                Swal.fire('Congratulations', response.message, 'success').then(() => {
                    setIsRegister(false);
                    resetPayload();
                })
            } else {
                Swal.fire('Oops!', response.message, 'error')
            }
        } else {
            const response = await apiLogin(data);
            if (response.success) {
                dispatch(register({ isLoggedIn: true, token: response.accessToken, userData: response.userData }));
                navigate(`/${path.HOME}`);
                resetPayload();
            } else {
                Swal.fire('Oops!', response.message, 'error')
            }
        }
    }, [payload, isRegister])
    return (
        <div className='w-full relative'>
            <img
                src='https://img.freepik.com/premium-vector/geometric-gradient-technology-background_23-2149110132.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703030400&semt=ais'
                alt=''
                className='w-full h-full object-cover'
            />
            <div className='absolute top-[120px] left-1/2 translate-x-[-50%] flex justify-center'>
                <div className='p-8 bg-white rounded-md min-w-[500px]'>
                    <h1 className='text-[28px] font-semibold text-gray-600 uppercase text-center mb-4'>{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && <div className='flex justify-between items-center gap-4'>
                        <InputField
                            value={payload.firstname}
                            setValue={setPayload}
                            nameKey='firstname'
                        />
                        <InputField
                            value={payload.lastname}
                            setValue={setPayload}
                            nameKey='lastname'
                        />
                    </div>}
                    {isRegister && <InputField
                        value={payload.mobile}
                        setValue={setPayload}
                        nameKey='mobile'
                        type='phone'
                    />}
                    <InputField
                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                        type='email'
                    />
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type='password'
                    />
                    <Button
                        name={isRegister ? 'Register' : 'Login'}
                        handleOnClick={handleSubmit}
                        fw='w-full'
                    />
                    <div className='flex items-center justify-between mt-2 text-sm'>
                        {isRegister || <span
                            className='text-gray-500 hover:underline hover:italic cursor-pointer'
                        >
                            Forgot your Account?
                        </span>}
                        <span
                            className={`text-gray-500 hover:underline hover:italic cursor-pointer ${isRegister ? 'w-full text-right' : ''}`}
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? 'You have a account. Sign in?' : 'Create Account'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login