import { NextPage } from 'next';
import React from 'react'

interface Props {
    isVisible:boolean;
    ondelete:any;
    onclose:() => void;
    nameStrategy:string;
    id:number
}

const Modaldelete:NextPage<Props> = (Props) => {
    if (!Props.isVisible) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 
    backdrop-blur-sm flex justify-center items-center'>
        <div className='max-w-2xl w-full bg-white rounded-md p-2'>
            <h1 className='my-2 p-2 text-2xl text-center'>Delete Strategy ID{Props.id}</h1>
            <p className='my-2 p-2 text-xl text-center'>Are you sure to delete? {Props.nameStrategy}</p>
            <div className='my-2 flex gap-2 justify-center'>
                <button className='p-2 bg-blue-700 hover:bg-blue-900 rounded-md text-white'
                onClick={Props.ondelete}>Delete Strategy</button>
                <button className='p-2 bg-red-600 hover:bg-red-900 rounded-md text-white'
                onClick={Props.onclose}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Modaldelete