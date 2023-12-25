import React from 'react';
import Link from 'next/link';
import { RiStockFill } from 'react-icons/ri';
import Logo from '@/public/Logo.png'
import Avatar from '@/public/avatar.jpg'
import Image from 'next/image';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
      <div className='fixed w-[17.5rem] h-screen p-4 bg-gray-100 border-r-[1px] flex flex-col justify-between'>
        <div className='flex flex-col items-center'>
          <Link href='/dashboard'>
            <div className='text-white rounded-lg inline-block p-3'>
              <Image src={Logo} alt='Logo' width={70} />
            </div>
          </Link>
          <div className='text-black p-3 bg-gray-200 rounded-md w-10/12'>
            <div className='flex gap-3'>
              <Image src={Avatar} width={50} height={50} alt='Avatar' className='rounded-full' />
              <p className='m-auto text-md'>MakiJangEIEI</p>
            </div>
          </div>
          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
          <div className='w-full p-1'>
            <Link href='/dashboard'>
              <div className='bg-gray-200 hover:bg-gray-400 cursor-pointer my-4 p-3 rounded-lg flex gap-4 active:bg-gray-400'>
                <RiStockFill size={20} />
                <p>Tradingjounal</p>
              </div>
            </Link>
            <Link href='/dashboard/backtest'>
              <div className='bg-gray-200 hover:bg-gray-400 cursor-pointer my-4 p-3 rounded-lg flex gap-4 '>
                <RiStockFill size={20} />
                <p>Backtest</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <main className='ml-80 w-full mr-10 mt-12'>{children}</main>
    </div>
  );
};

export default Sidebar;