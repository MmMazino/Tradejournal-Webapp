import React from 'react'

const TopCards = () => {
    return (
        <div className='grid lg:grid-cols-4 gap-4 p-4 bg-white rounded-md'>
            <div className='top-cards'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold text-black'>Account balance</p>
                    <p className='text-gray-600'>11500 $</p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                    <span className='text-green-700 text-lg'>$11,500.00</span>
                </p>
            </div>
            <div className='top-cards'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold text-black'>Win Rate</p>
                    <p className='text-gray-600'>Number of Trades: 1345</p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                    <span className='text-green-700 text-lg'>68%</span>
                </p>
            </div>
            <div className='top-cards'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold text-black'>Profit</p>
                    <p className='text-gray-600'>Number of Trades: 1345</p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                    <p className='text-green-700 text-lg'>+1500$</p>
                </p>
            </div>
            <div className='top-cards'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold text-black'>Lose</p>
                    <p className='text-gray-600'>Number of Trades Loss: 50</p>
                </div>
                <p className='bg-red-200 flex justify-center items-center p-2 rounded-lg'>
                    <p className='text-red-700 text-lg'>-1500$</p>
                </p>
            </div>
        </div>
    )
}

export default TopCards