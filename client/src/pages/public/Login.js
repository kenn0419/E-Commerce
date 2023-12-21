import React, { useCallback, useState } from 'react'
import { InputField, Button } from '../../components'

const Login = () => {
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        name: ''
    })
    const [isRegister, setIsRegister] = useState(false);
    const handleSubmit = useCallback(() => {
        console.log(payload);
    }, [payload])
    return (
        <div className='w-full relative'>
            <img
                src='https://img.freepik.com/premium-vector/geometric-gradient-technology-background_23-2149110132.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703030400&semt=ais'
                alt=''
                className='w-full h-full object-cover'
            />
            <div className='absolute top-1/4 left-1/2 translate-x-[-50%] flex justify-center'>
                <div className='p-8 bg-white rounded-md min-w-[500px]'>
                    <h1 className='text-[28px] font-semibold text-gray-600 uppercase text-center mb-4'>{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && <InputField
                        value={payload.name}
                        setValue={setPayload}
                        nameKey='name'
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