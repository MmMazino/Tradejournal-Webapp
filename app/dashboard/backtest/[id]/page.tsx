import React from 'react'
import Carddashboard from '@/components/carddashboard'
import Linechart from '@/components/linechart'
import moment from 'moment';
import {BsPlusSquare} from 'react-icons/Bs';
import {BsCardImage} from 'react-icons/Bs';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const getBacktestData = async (id:number) => {
  const res = await fetch(`http://localhost:3333/backtestdata/readData/${id}`,{ next: { revalidate: 10 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

const getBacktestPortData = async (id:number) => {
  const res = await fetch(`http://localhost:3333/backtest/readDataid/${id}`,{ next: { revalidate: 10 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

function sumData(data:any,initialbalance:number){
  let persentwinrate:number = 0;
  let pnl:number = 0;
  let win:number = 0;
  let loss:number = 0;
  let totaltrade = data.length
  let balance = [];
  let number = [];

  for(var i=0; i < data.length; i++){
  number.push(i+1)
  pnl += data[i].netpnl;
  initialbalance += data[i].netpnl;
  balance.push(initialbalance)
  if(data[i].winloss == "win"){
    win += 1;
  }
  else {
      loss += 1;
    }
  }
  persentwinrate = (win/totaltrade)*100; 
  return {number:number,balance:balance,winrate:Math.floor( persentwinrate * 100 ) / 100,totaltrade:totaltrade,totalpnl:pnl,sumwin:win,sumloss:loss}
}

async function page({ params }: { params: { id: number } }) {
  const data = await getBacktestData(params.id);
  const backtestport = await getBacktestPortData(params.id);
  const sumDashboard:any =  sumData(data,backtestport[0].initialbalance);
  const balance:number = backtestport[0].initialbalance+sumDashboard.totalpnl

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex justify-between my-2'>
        <h1 className='text-4xl'>{backtestport[0].name}</h1>
        <Link href={`${params.id}/adddata`} className='p-2 text-white bg-blue-700 rounded-lg flex gap-2 shadow-md hover:bg-blue-900'>
          <BsPlusSquare size={18} className="my-auto ml-2"/>
          <p className='mr-2'>New Strategy</p>
        </Link>
      </div>
      <Carddashboard winrate={sumDashboard.winrate} totaltrade={sumDashboard.totaltrade} totalpnl={sumDashboard.totalpnl} win={sumDashboard.sumwin} loss={sumDashboard.sumloss} />
        <Linechart balance={sumDashboard.balance} number={sumDashboard.number}/>
        <h1 className='my-2 bg-white rounded-md h-fit p-2'>Balance :{balance}</h1>
      <table className="bg-white w-full my-10 rounded-lg shadow-lg">
          <thead>
            <tr className='border-b-2'>
              <th className='p-2'>symbol</th>
              <th className='p-2'>position</th>
              <th className='p-2'>date</th>
              <th className='p-2'>session</th>
              <th className='p-2'>lotsize</th>
              <th className='p-2'>entryprice</th>
              <th className='p-2'>sl</th>
              <th className='p-2'>tp</th>
              <th className='p-2'>exitprice</th>
              <th className='p-2'>pips</th>
              <th className='p-2'>pnl</th>
              <th className='p-2'>% pnl</th>
              <th className='p-2'>win/loss</th>
              <th className='p-2'>strategy</th>
              <th className='p-2'>mistake</th>
              <th className='p-2'>image</th>
              <th className='p-2'>note</th>
            </tr>
          </thead>
        <tbody>
        {data.map((item:any,index:number)=>(
          <tr key={index} className='text-center'>
            <td>{item.symbol}</td>
            <td>{item.position}</td>
            <td>{moment.utc(item.date).format('MM/DD/YY')}</td>
            <td>{item.session}</td>
            <td>{item.lotsize}</td>
            <td>{item.entryprice}</td>
            <td>{item.stoploss}</td>
            <td>{item.takeprofit}</td>
            <td>{item.exitprice}</td>
            <td>{item.pips}</td>
            <td>{item.netpnl}</td>
            <td>{item.percentpnl}</td>
            <td className={item.winloss === "win" ? 'bg-green-300' : 'bg-red-300'}>{item.winloss}</td>
            <td>{item.strategy}</td>
            <td>{item.mistake}</td>
            <td><Link href={params.id+'/tradedata/'+item.id_trade} className='hover:opacity-50'><BsCardImage size={20} className='mx-auto'/></Link></td>
            <td>{item.note}</td>
          </tr>
        ))}
            </tbody>
      </table>
    </div>
  )
}

export default page