import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/deleteBook'
import Main from './pages/Main'
// import ProtectedRoute from './ProtectedRoute'
// import useAuth from './components/Auth/useAuth'


function App() {
  // const [isAuth, login, logout] = useAuth(false)
  

  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/home' element={<Home/>} />
      <Route path='/books/details/:id' element={<ShowBook/>} />
      <Route path='/books/create' element={<CreateBook/>} />
      <Route path='/books/edit/:id' element={<EditBook/>} />
      <Route path='/books/delete/:id' element={<DeleteBook/>} />         
    </Routes>
  )
}

export default App;