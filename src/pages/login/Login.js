import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const onSubmit = () => {
    login({
        email: email,
        password: password
    }).then((res) => {
        if(res?.error) return toast.error("Something went wrong")
        toast.success("Login Successed")
    })
}

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-6">Admins Login</h1>
        <form onSubmit={(e) => {
                            e.preventDefault()
                            onSubmit()
          }} className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-bold text-left text-lg">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="p-3 mb-5 border border-gray-300 rounded-md text-lg"
          />

          <label htmlFor="password" className="mb-2 font-bold text-left text-lg">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password} onChange={(e) => setPassword(e.target.value)} 
            required
            className="p-3 mb-6 border border-gray-300 rounded-md text-lg"
          />

          <button
            type="submit"
            className="p-3 text-lg font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
