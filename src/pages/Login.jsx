import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginForm = () => {

  const [email, setEmail] = useState('eve.holt@reqres.in');//state for email
  const [password, setPassword] = useState('cityslicka');//state for password
  const [Error,setError] = useState('');//state for error

  const navigate = useNavigate();//make an variable for navigation

//   function to handle login logic
  const handleLogin = async(e)=> {
    e.preventDefault();
    try {
        //send post request to the api endpoint
        const response = await axios.post("https://reqres.in/api/login", { 
          email,
          password,
        });
        // if login successfull store the token.
        localStorage.setItem("token", response.data.token);
        //show success notification.
        toast.success("Login Sucessfull",{ autoClose: 2000 })
        setTimeout(() => {
            navigate("/users");
          }, 2000);
      } catch (err) {
        setError("Invalid credentials!");
        toast.error("Invalid credentials!", { autoClose: 2000 });
    }
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ECF0F3]">
      <div className="bg-[#ECF0F3] p-6 rounded-2xl shadow-lg drop-shadow-2xl w-80 text-center relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-16  rounded-full flex items-center justify-center shadow-md bg-gray-100">
          <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 1112 0H4z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-700 mt-8 drop-shadow-2xl">Login Please</h2>
        {/* login form */}
        <form 
        onSubmit={(e)=>{handleLogin(e)}}
        className="flex flex-col mt-4 gap-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-white shadow-inner outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <input
            type="password"
            placeholder="Password"
           className="w-full px-4 py-2 rounded-md bg-white shadow-inner outline-none focus:ring-2 focus:ring-orange-400"
           value={password}
           onChange={(e)=>{setPassword(e.target.value)}}
          />
          <button className="w-full bg-orange-500 text-white shadow-inner p-2 mt-4 rounded-lg  hover:bg-orange-600 transition cursor-pointer">
            Login
          </button>
        </form>
        <div className="flex justify-center items-center text-xs text-gray-500 mt-2 gap-2">
          <Link 
          to={'/'}
          className="text-orange-500 cursor-pointer hover:underline">Don't have an account? Register now</Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
