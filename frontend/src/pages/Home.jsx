import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import { useSnackbar } from 'notistack';
import Logout from '../components/Auth/Logout';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/home/PaginationBar/PaginationBar';


function Home() {

  if (localStorage.getItem("isAuth") === 'false') {
    const { enqueueSnackbar } = useSnackbar();
    enqueueSnackbar('Please Login !!', { variant: 'error' });
    return <Navigate to={'/'} />
  }
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [searchTerm, setsearchTerm] = useState('');
  const [currPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/books?title=${searchTerm}&author=${searchTerm}&page=${currPage}&limit=${limit}`).then((response) => {
      setBooks(response.data.data)
      setLoading(false)

    }).catch((error) => {
      console.log("ERROR MESSAGE ::", error)
      setLoading(false)
    })
  }, [searchTerm,currPage])

  const handleSetCurrentPage = (curr) => {
    setCurrentPage(curr)
  }



  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      <SearchBar searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
      {loading ? (<Spinner />
      ) : (showType === 'table' ? (<BooksTable books={books} currPage={currPage} handleSetCurrentPage={handleSetCurrentPage} limit={limit}/>) : (<BooksCard books={books} currPage={currPage} handleSetCurrentPage={handleSetCurrentPage} limit={limit}/>)
      )}
      <Pagination currPage={currPage} handleSetCurrentPage={handleSetCurrentPage} limit={limit}/>
      <Logout />
    </div>
  );
}

export default Home;