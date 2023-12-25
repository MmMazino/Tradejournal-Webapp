"use client";
import React, { ChangeEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import {BsPlusSquare} from 'react-icons/Bs';
import {AiOutlineEye} from 'react-icons/ai';
import {MdDeleteOutline} from 'react-icons/md';
import Modal from '@/components/modal';
import ModalDelete from '@/components/modaldelete';

const getBacktestPortData = async () => {
  const res = await fetch('http://localhost:3333/backtest/readData',{ next: { revalidate: 10 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

function Page() {
 const [showModal,setShowModal] = useState(false);
 const [showDeleteModal,setShowDeleteModal] = useState(false);
 const [data,setData] = useState([]);
 const [strategy,setStrategy] = useState({name:"",initialbalance:0})

 useEffect(() => {
  (async () => {
    const data = await getBacktestPortData();
    setData(data);
  })();
  }, []);

  const handleNameChange  = (e: ChangeEvent<HTMLInputElement>) => {
    setStrategy(prevStrategy => ({
      ...prevStrategy,
      name: e.target.value
    }));
  };
  const handleInitialBalanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStrategy(prevStrategy => ({
      ...prevStrategy,
      initialbalance: parseFloat(e.target.value)
    }));
  };

  const sentData = async()=>{
    try {
      const { name, initialbalance } = strategy;
      const res = await fetch(
        'http://localhost:3333/backtest/createData',
        {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, initialbalance })
        }
      );
      const data = await res.json();
      console.log(data);
      setShowModal(false);
    } catch (err){
      console.log(err);
    }
  };

  const deleteData = async(id:number) => {
    try {
      const res = await fetch(
        `http://localhost:3333/backtest/deleteData/${id}`,
        {
          method:'DELETE',
          headers:{
            'Content-Type': 'application/json'
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setShowDeleteModal(false);
    } catch(err){
      console.log(err);
      
    }
  };
  
  return (
    <div className='max-w-5xl mx-auto'>
      <div className='flex justify-between'>
        <h1 className='text-4xl'>Strategy</h1>
        <button className='p-2 text-white bg-blue-700 rounded-lg flex gap-2 shadow-md hover:bg-blue-900'
          onClick={()=>{setShowModal(true)}}>
          <BsPlusSquare size={18} className="my-auto ml-2"/>
          <p className='mr-2'>New Strategy</p>
        </button>
      </div>
      <table className="bg-white w-full mt-10 rounded-lg shadow-lg">
        <thead>
          <tr className='border-b-2'>
            <th className='p-2'>Name</th>
            <th className='p-2'>initialbalance</th>
            <th className='p-2'></th>
          </tr>
        </thead>
        <tbody>
              {data.map((item:any,index:number) => (
              <tr key={index} className='hover:bg-slate-300 rounded-lg border-b-2'>
                <td className='p-2'>{item.name}</td>
                <td className='text-center'>
                  <Link href={"backtest/"+item.id_backtestport}>{item.initialbalance}</Link>
                </td>
                <td className='flex justify-center gap-2 p-2'>
                  <Link href={"backtest/"+item.id_backtestport}><AiOutlineEye size={24} className='mx-auto'/></Link>
                  <button onClick={()=>{setShowDeleteModal(true)}}><MdDeleteOutline size={24}/></button>
                  <ModalDelete isVisible={showDeleteModal} onclose={()=>setShowDeleteModal(false)} ondelete={()=>deleteData(item.id_backtestport)} nameStrategy={item.name} id={item.id_backtestport}/>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal isVisible={showModal} onclose={()=>setShowModal(false)} namechange={handleNameChange} balancechange={handleInitialBalanceChange} sentdata={sentData}/>
    </div>
  )
}

export default Page