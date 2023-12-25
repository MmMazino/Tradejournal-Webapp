'use client';
import React from 'react'
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { AppDispatch } from "@/redux/store";
import { logOut } from '@/redux/features/authSlice';

const Page = () => {

  const token = useAppSelector((state)=> state.authReducer.value.token);

  const dispatch = useDispatch<AppDispatch>();

  const handleAuth =async () => {
    try {
      const res = await fetch(
      'http://localhost:3333/auth/checkauth',
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+token
        },
      })
      const data = await res.json()
      if (data.status == 'ok') {
        alert('auth success')
        console.log(data)
      } else {
        alert('login Failed')
        dispatch(logOut())
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <h1 className='text-3xl font-semibold'>Hi, Welcome back</h1>
      <button onClick={handleAuth} >Check auth</button>
    </main>
  )
}

export default Page