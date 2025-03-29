import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterForm from './pages/Register'
import LoginForm from './pages/Login'
import Users from './pages/Users'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/Register' element={<RegisterForm/>}/>
      </Routes>
    </div>
  )
}

export default App
