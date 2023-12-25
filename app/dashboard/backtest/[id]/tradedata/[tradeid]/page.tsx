import React from 'react'
import moment from 'moment';
import Image from 'next/image';

const getDataTrade = async (id:number) => {
  const res = await fetch(`http://localhost:3333/backtestdata/readDataid/${id}`,{ next: { revalidate: 10 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

const Backtestdata = async ({params}:{params:{tradeid:number}}) => {
    const data = await getDataTrade(params.tradeid)
    console.log(data);
  return (
    <div>
      <h1 className='text-4xl'>Trade id: {params.tradeid}</h1>
      <Image src={"http://localhost:3333/images/"+data[0].imagem15} width={1980} height={1040} alt='TradSetup' className='m-2 shadow-md' />
      <div>
        <h1>Symbol:{data[0].symbol}</h1>
        <h1>Position:{data[0].position}</h1>
        <h1>Date:{moment.utc(data[0].date).format('DD/MM/YY')}</h1>
        <h1>Session:{data[0].session}</h1>
        <h1>Lotsize:{data[0].lotsize}</h1>
        <h1>Entryprice:{data[0].entryprice}</h1>
        <h1>stoploss:{data[0].stoploss}</h1>
        <h1>takeprofit:{data[0].takeprofit}</h1>
        <h1>exitprice:{data[0].exitprice}</h1>
        <h1>pips:{data[0].pips}</h1>
        <h1>netpnl:{data[0].netpnl}</h1>
        <h1>percentpnl:{data[0].percentpnl}</h1>
        <h1>winloss:{data[0].winloss}</h1>
        <h1>strategy:{data[0].strategy}</h1>
        <h1>mistake:{data[0].mistake}</h1>
        <h1>imagem15:{data[0].imagem15}</h1>
        <h1>imagem5:{data[0].imagem5}</h1>
        <h1>note:{data[0].note}</h1>
      </div>
    </div>
  )
}

export default Backtestdata