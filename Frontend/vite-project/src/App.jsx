import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import './App.css'
import Login from '../Pages/Login'
import Verify from '../Pages/Verify'
import ResetPassword from '../Pages/ResetPassword'
import Profile from '../Pages/Profile'
import UpdatePassword from '../Pages/UpdatePassword'
import toast, { Toaster } from 'react-hot-toast';
import Register from '../Pages/Register'
import ForgotPassword from '../Pages/ForgotPassword'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/updatePassword' element={<UpdatePassword />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
      </Routes>
       <Toaster />
    </>
  )
}

export default App

const Root = () => {
  return <Navigate to="/login" />;
};

