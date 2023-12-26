import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import path from '../../ultils/path';
import Swal from 'sweetalert2';

const FinalRegister = () => {
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (params.status === 'failed') {
            Swal.fire({
                icon: 'error',
                title: 'Oops....',
                text: 'Register failed'
            }).then(() => {
                navigate(`/${path.LOGIN}`);
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Congratulation!!!',
                text: 'Register successfully!'
            }).then(() => {
                navigate(`/${path.LOGIN}`);
            })
        }
    }, [])
    return (
        <div className='h-screen w-screen bg-gray-100'>

        </div>
    )
}

export default FinalRegister