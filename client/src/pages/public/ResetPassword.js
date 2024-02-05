import { useState } from 'react'
import { Button } from 'components';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from 'apis';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const { token } = useParams();
    const handleResetPassword = async () => {
        const response = await apiResetPassword({ password, token });
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }
    return (
        <div className='bg-[url("https://public-assets.toggl.com/b/static/a848ad9070fcf959a459fa1e878d2abb/c0583/hero-laptops.jpg")] w-screen h-screen'>
            <div
                className={`absolute top-0 left-0 right-0 bottom-0 z-50 bg-overlay flex flex-col pt-16 items-center animate-slide-bottom`}>
                <div className='w-[700px] bg-white rounded-md'>
                    <div className='flex flex-col gap-4 p-4'>
                        <label htmlFor='password' className='text-center uppercase font-semibold'>Reset Password</label>
                        <input
                            id='password'
                            type='password'
                            placeholder='Enter your new password'
                            className=' outline-none p-2 border-b border-hover-2 placeholder:text-sm placeholder:italic'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='flex justify-end items-center'>
                            <Button
                                name='Submit'
                                handleOnClick={handleResetPassword}
                            />
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default ResetPassword