import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Logout from '../components/Auth/Logout';


function EditBook() {
    if(localStorage.getItem("isAuth")==='false')
    {
        const { enqueueSnackbar } = useSnackbar();
        enqueueSnackbar('Please Login !!', { variant: 'error' });
        return <Navigate to={'/'} />
    }

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
        .then((response) => {
            console.log(response.data.data)
            setTitle(response.data.data.title)
            setAuthor(response.data.data.author);
            setPublishYear(response.data.data.publishYear)
            setLoading(false);
          }).catch((error) => {
            setLoading(false);
            // alert('An error happened. Please Chack console');
            enqueueSnackbar('ERROR', { variant: 'error' });
            console.log("ERROR MESSAGE ::",error)
          });
      }, [])

      const handleEditBook = () => {
        const data = {
          title,
          author,
          publishYear,
        };
        setLoading(true);
        axios.put(`http://localhost:5555/books/${id}`, data)
          .then(() => {
            setLoading(false);
            enqueueSnackbar('BookDetails Edited successfully', { variant: 'success' });
            navigate('/home');
          })
          .catch((error) => {
            setLoading(false);
            // alert('An error happened. Please Chack console');
            enqueueSnackbar('ERROR', { variant: 'error' });
            console.log("ERROR MESSAGE ::",error)
          });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input
                        type='number'
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                    Save
                </button>
            </div>
            <Logout />
        </div>
    );
}

export default EditBook;