import React, { useContext } from 'react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthProvider';

const ErrorPage = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handelSignOut = () => {
        logOut()
            .then(() => {
                navigate('/login')
            })
            .cathc(err => console.log(err))
    }
    return (
        <>
            <div className='flex flex-col min-h-[700px] justify-center items-center'>
                {error && (
                    <div>
                        <img src="https://i.ibb.co/fqPFJ0J/emoji-problem-social-face-reaction-emotion-clueless-sad-512.png" className='w-3/12 mx-auto' alt="" />
                        <div>
                            <p className='text-8xl font-extrabold text-center text-red-500'>{error.status}</p>
                            <p className='text-red-500 text-center font-bold'>{error.statusText || error.message}</p>
                        </div>
                    </div>
                )}
                <br />
                <h1 className='md:text-6xl'>Ops! An Error Ocurred!</h1>
                <Link onClick={handelSignOut} className='btn btn-error text-white mt-10 hover:bg-white hover:text-error'>Sign Out</Link>
            </div>
        </>
    )
}

export default ErrorPage;