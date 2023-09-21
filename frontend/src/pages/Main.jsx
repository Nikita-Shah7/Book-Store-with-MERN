import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Login from '../components/Auth/Login'
import SignUp from '../components/Auth/SignUp'


function Main() {

    localStorage.setItem("isAuth","false")
    console.log(localStorage.getItem("isAuth"))

    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('signup');


    return (
        <div className='p-4'>
            {loading ? (<Spinner />
            ) : (showType === 'signup' ? (<SignUp/>) : (<Login />)
            )}
            <div className='p-4'>
                <div className='flex justify-center items-center gap-x-4'>
                    <button
                        className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                        onClick={() => setShowType('login')}
                    >
                        LOGIN
                    </button>
                    <button
                        className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                        onClick={() => setShowType('signup')}
                    >
                        SIGNUP
                    </button>
                </div>
                <div className='flex justify-between items-center'></div>
            </div>
        </div>
    );
}

export default Main;