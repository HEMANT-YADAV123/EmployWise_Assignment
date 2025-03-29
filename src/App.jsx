import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterForm from './pages/Register'
import LoginForm from './pages/Login'
import Users from './pages/Users'
import EditUser from './pages/EditUsers'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path='/Register' element={<RegisterForm/>}/>
      </Routes>
    </div>
  )
}

export default App
