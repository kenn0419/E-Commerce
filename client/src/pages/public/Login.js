import { useCallback, useEffect, useState } from 'react'
import { InputField, Button, Loading } from 'components'
import { apiFinalRegister, apiForgotPassword, apiLogin, apiRegister } from 'apis';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import path from 'ultils/path';
import { login } from 'store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from 'ultils/helper';
import { showModal } from 'store/app/appSlice';

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
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);
    const [token, setToken] = useState('');
    const [isVerifyEmail, setIsVerifyEmail] = useState(false);
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: ''
        })
    }
    useEffect(() => {
        resetPayload();
        setInvalidFields([]);
    }, [isRegister])
    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload;
        const inValids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
        if (inValids === 0) {
            if (isRegister) {
                dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
                const response = await apiRegister(payload);
                dispatch(showModal({ isShowModal: false, modalChildren: null }))
                if (response.success) {
                    setIsVerifyEmail(true);
                    // Swal.fire('Congratulations', response.message, 'success').then(() => {
                    //     setIsRegister(false);
                    //     resetPayload();
                    // })
                } else {
                    Swal.fire('Oops!', response.message, 'error')
                }
            } else {
                const response = await apiLogin(data);
                if (response.success) {
                    dispatch(login({ isLoggedIn: true, token: response.accessToken, current: response.userData }));
                    navigate(`/${path.HOME}`);
                    resetPayload();
                } else {
                    Swal.fire('Oops!', response.message, 'error')
                }
            }
        }
    }, [payload, isRegister])
    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email });
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }
    const handleFinalRegister = async () => {
        const response = await apiFinalRegister({ token });
        if (response.success) {
            toast.success(response.message);
            setIsVerifyEmail(false);
            setIsRegister(false);
        } else {
            toast.error(response.message);
        }

    }
    return (
        <div className='w-full relative'>
            {isVerifyEmail && <div
                className={`absolute top-0 left-0 right-0 bottom-0 z-50 bg-overlay flex flex-col pt-16 items-center animate-slide-bottom`}>
                <div className='w-[700px] bg-white rounded-md'>
                    <div className='flex flex-col gap-4 p-4'>
                        <label htmlFor='email' className='text-center uppercase font-semibold'>Verify code</label>
                        <input
                            id='email'
                            placeholder='Enter your verify code in email'
                            className=' outline-none p-2 border-b border-hover-2 placeholder:text-sm'
                            onChange={(e) => setToken(e.target.value)}
                            value={token}
                        />
                        <div className='flex justify-between items-center'>
                            <Button
                                handleOnClick={() => setIsVerifyEmail(false)}
                                style={`px-4 py-2 round-md text-white bg-gray-500 font-semibold rounded-md my-2`}
                            >
                                Back
                            </Button>
                            <Button handleOnClick={handleFinalRegister}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div >}
            {isForgotPassword &&
                <div
                    className={`absolute top-0 left-0 right-0 bottom-0 z-50 bg-overlay flex flex-col pt-16 items-center animate-slide-bottom`}>
                    <div className='w-[700px] bg-white rounded-md'>
                        <div className='flex flex-col gap-4 p-4'>
                            <label htmlFor='email' className='text-center uppercase font-semibold'>Forgot password</label>
                            <input
                                id='email'
                                placeholder='Enter your email'
                                className=' outline-none p-2 border-b border-hover-2 placeholder:text-sm'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <div className='flex justify-between items-center'>
                                <Button
                                    handleOnClick={() => setIsForgotPassword(false)}
                                    style={`px-4 py-2 round-md text-white bg-gray-500 font-semibold rounded-md my-2`}
                                >Back</Button>
                                <Button
                                    handleOnClick={handleForgotPassword}
                                >Submit</Button>
                            </div>
                        </div>
                    </div>
                </div >}
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
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        <InputField
                            value={payload.lastname}
                            setValue={setPayload}
                            nameKey='lastname'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                    </div>}
                    <InputField
                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                        type='email'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    {isRegister && <InputField
                        value={payload.mobile}
                        setValue={setPayload}
                        nameKey='mobile'
                        type='phone'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />}
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type='password'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Button
                        handleOnClick={handleSubmit}
                        fw='w-full'
                    >{isRegister ? 'Register' : 'Login'}</Button>
                    <div className='flex items-center justify-between mt-2 text-sm'>
                        {isRegister || <span
                            className='text-gray-500 hover:underline hover:italic cursor-pointer'
                            onClick={() => setIsForgotPassword(!isForgotPassword)}
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
                    <Link className='text-gray-500 hover:underline hover:italic cursor-pointer text-center block text-base' to={`/${path.HOME}`}>Go home</Link>
                </div>
            </div>
        </div >
    )
}

export default Login