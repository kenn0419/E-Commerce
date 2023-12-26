import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const FinalRegister = () => {
    const params = useParams();
    useEffect(() => {
        if (params.status === 'failed') {
            Swal.fire({
                icon: 'error',
                title: 'Oops....',
                text: 'Register failed'
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Congratulation!!!',
                text: 'Register successfully!. Please return to the login page to sign-in'
            })
        }
    }, [])
    return (
        <div className='h-screen w-screen bg-gray-100'>

        </div>
    )
}

export default FinalRegister