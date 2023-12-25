import React from 'react'
import { NextPage } from "next";

interface Props {
    winrate:number;
    totalpnl:number;
    totaltrade:number;
    win:number;
    loss:number;
}

const carddashboard:NextPage<Props> = (Props) => {
    const data = Props;
  return (
    <div className='bg-white p-10 rounded-md shadow-xl'>
        <div className='flex gap-2'>
            <div className='flex-auto text-center'>
                <h1 className='text-xl'>Winrate:</h1>
                <p className='text-2xl font-semibold'>{data.winrate}%</p>
            </div>
            <div className='flex-auto text-center'>
                <h1 className='text-xl'>Total Pnl:</h1>
                <p className='text-2xl font-semibold'>{data.totalpnl}</p>
            </div>
            <div className='flex-auto text-center'>
                <h1 className='text-xl'>Total Trades:</h1>
                <p className='text-2xl font-semibold'>{data.totaltrade}</p>
            </div>
            <div className='flex-auto text-center'>
                <h1 className='text-xl'>Win/Loss:</h1>
                <p className='text-2xl font-semibold'>{data.win}/{data.loss}</p>
            </div>
        </div>
    </div>
  )
}

export default carddashboard