import React, { useState } from 'react';
import Spinner from '../Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import bcrypt from 'bcryptjs';



function SignUp() {

    const [username, setUname] = useState('');
    const [passwd, setPasswd] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveUser =  () => {
        // hashedPassword
        const password =  bcrypt.hashSync(passwd,10);
        // console.log(password)
        const data = {
            username,
            password,
        };
        setLoading(true);
        axios.post('http://localhost:5555/user', data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('User Created successfully', { variant: 'success' });
                localStorage.setItem("isAuth",true)
                navigate('/home');
            })
            .catch((error) => {
                setLoading(false);
                // alert('An error happened. Please Check console');
                if (error.response.data.message == 'Username already exists')
                    enqueueSnackbar(error.response.data.message, { variant: 'error' });
                else enqueueSnackbar('ERROR', { variant: 'error' });
                console.log("ERROR MESSAGE ::", error)
                // console.log("ERROR MESSAGE ::", error.response.data.message)
            });
    };

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4'>SignUp</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Username</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUname(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Password</label>
                    <input
                        type='text'
                        value={passwd}
                        onChange={(e) => setPasswd(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveUser}>
                    SIGNUP
                </button>
            </div>
        </div>
    );
}

export default SignUp;