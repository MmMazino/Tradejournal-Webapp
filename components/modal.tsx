import { NextPage } from 'next';
import React from 'react'

interface Props {
    isVisible:boolean
    onclose:() => void;
    namechange:any;
    balancechange:any;
    sentdata:()=>void;
}

const Modal:NextPage<Props> = (Props) => {
    const close = Props.onclose
    if (!Props.isVisible) return null;    
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 
    backdrop-blur-sm flex justify-center items-center'>
        <div className='max-w-2xl w-full bg-white rounded-md p-2'>
            <h1 className='my-2 p-2 text-2xl text-center'>Add Strategy</h1>
            <form className='flex-col flex'>
                <label className='p-2 text-xl'>Name:
                    <input type="text" className='border-2 rounded-md ml-2 p-1' 
                    onChange={Props.namechange}/>
                </label>
                <label className='p-2 text-xl'>Initialbalance:
                    <input type="number" className='border-2 rounded-md ml-2 p-1'
                    onChange={Props.balancechange}/>
                </label>
            </form>
            <div className='my-2 flex gap-2 justify-center'>
                <button className='p-2 bg-blue-700 hover:bg-blue-900 rounded-md text-white'
                onClick={Props.sentdata}>Add Strategy</button>
                <button className='p-2 bg-red-600 hover:bg-red-900 rounded-md text-white'
                onClick={close}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Modal