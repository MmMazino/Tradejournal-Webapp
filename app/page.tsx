'use client';
import Link from "next/link";
import { useRouter , redirect } from 'next/navigation';
import Logo from '@/public/Logo.png'
import Image from 'next/image';
import { ChangeEvent,useState } from "react";
import { useDispatch } from 'react-redux'
import { logIn , logOut } from '@/redux/features/authSlice'
import { AppDispatch } from "@/redux/store";

export default function Home() {
  const [user,setUser] = useState({username:"",password:""})

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleInput = (e:ChangeEvent<HTMLInputElement>)=>{
    setUser(prevUser=>({
      ...prevUser,
      [e.target.name]:e.target.value
    }))   
  }

  const handleSubmit = async() => {
    try {
    const {username,password} = user
    const res = await fetch(
      'http://localhost:3333/auth/login',
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      }
    );
    const data = await res.json();   
    if (data.Login == true){
      alert('login success')
      localStorage.setItem('token',data.token)
      dispatch(logIn(data.token))
      router.push('/dashboard')
    }
    } catch (err){
      console.log(err);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <Image src={Logo} alt='Logo' width={70} className="mx-auto"/>
        <form className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={handleInput}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <Link
            href="/forget"
            className="text-xs text-blue-600 hover:underline"
          >
            Forget Password?
          </Link>
        </form>
                  <div className="mt-2">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <p className="mt-4 text-sm text-center text-gray-700">Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
      </div>
    </div>
  )
}

