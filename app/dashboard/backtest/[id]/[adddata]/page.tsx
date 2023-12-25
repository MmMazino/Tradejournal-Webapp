"use client";
import React, { ChangeEvent, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation'

const AdddataPage = ({ params }: { params: { id: number } }) => {
  
  const router = useRouter()

  const [startDate, setStartDate] = useState(new Date());
  const id:number = params.id;
  const [imageM15,setImageM15] = useState<File | null>(null);
  const [backtestData,setBacktestData] = useState({
    id_backtestport:id,
    symbol: "",
    position: "long",
    date: startDate,
    session: "Asian",
    lotsize: null,
    entryprice: null,
    stoploss: null,
    takeprofit: null,
    exitprice: null,
    pips: null,
    netpnl: null,
    percentpnl: null,
    winloss: "win",
    strategy: "",
    mistake: null,
    note:null 
  })
  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setBacktestData(prevbacktestData=>({
      ...prevbacktestData,
      [e.target.name]:e.target.value
    }));
  }
  
  const handleSelect = (e:ChangeEvent<HTMLSelectElement>)=>{
    setBacktestData(prevbacktestData=>({
      ...prevbacktestData,
      [e.target.name]:e.target.value
    }));
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageM15(file);
  };
  const sentimage =async () => {
    try {
        const formData = new FormData();
        formData.append('image',imageM15)
        const { id_backtestport,symbol, position, 
        date, session, lotsize, entryprice, stoploss, 
        takeprofit, exitprice, pips, netpnl, percentpnl, 
        winloss, strategy, mistake, note} = backtestData;
        formData.append('id_backtestport',JSON.stringify(id_backtestport));
        formData.append('symbol',symbol);
        formData.append('position',position);
        formData.append('date',JSON.stringify(date));
        formData.append('session',session);
        formData.append('lotsize',JSON.stringify(lotsize));
        formData.append('entryprice',JSON.stringify(entryprice));
        formData.append('stoploss',JSON.stringify(stoploss));
        formData.append('takeprofit',JSON.stringify(takeprofit));
        formData.append('exitprice',JSON.stringify(exitprice));
        formData.append('pips',JSON.stringify(pips));
        formData.append('netpnl',JSON.stringify(netpnl));
        formData.append('percentpnl',JSON.stringify(percentpnl));
        formData.append('winloss',winloss);
        formData.append('strategy',strategy);
        formData.append('imagem5',"test");
        formData.append('mistake',JSON.stringify(mistake));
        formData.append('note',JSON.stringify(note));
        console.log(formData.get('netpnl'));
        
        const res = await fetch(`http://localhost:3333/backtestdata/createData`,
        {
          method:'POST',
          body:formData
        }
      );
      const data = await res.json();
      alert(data.message)
      router.back();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className='text-4xl'>AddData to Id{params.id}</h1>
      <form className='flex gap-20 formadddata-backtest ml-10 mt-4'>
        <div>
          <div>
            <label>Symbol:</label>
            <input type='text' name='symbol' onChange={handleChange}/>
          </div>
          <div>
            <label>Position:</label>
            <select name='session' onSelect={handleSelect} defaultValue={backtestData.position}>
              <option value="long">Long</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div>
              <label>Date:</label>
              <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
          </div>
          <div>
            <label>Session:</label>
            <select name='session' onSelect={handleSelect} defaultValue={backtestData.session}>
              <option value="Asian">Asian</option>
              <option value="London">London</option>
              <option value="London/Newyork">London/Newyork</option>
              <option value="Newyork">Newyork</option>
            </select>
          </div>
          <div>
            <label>Lotsize:</label>
            <input type='number' name='lotsize' onChange={handleChange}/>
          </div>
          <div>
            <label>EntryPrice:</label>
            <input type='number' name='entryprice' onChange={handleChange}/>
          </div>
          <div>
            <label>Sl:</label>
            <input type='number' name='stoploss' onChange={handleChange}/>
          </div>
          <div>
            <label>Tp:</label>
            <input type='number' name='takeprofit' onChange={handleChange}/>
          </div>
          <div>
            <label>Exitprice:</label>
            <input type='number' name='exitprice' onChange={handleChange}/>
          </div>
        </div>
        <div>
          <div>
            <label>Pips:</label>
            <input type='number' name='pips' onChange={handleChange}/>
          </div>
          <div>
            <label>Netpnl:</label>
            <input type='number' name='netpnl' onChange={handleChange}/>
          </div>
          <div>
            <label>% Pnl:</label>
            <input type='number' name='percentpnl' onChange={handleChange}/>
          </div>
          <div>
            <label>Win/Loss:</label>
            <select name='winloss' onSelect={handleSelect} defaultValue={backtestData.session}>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
            </select>
          </div>
          <div>
            <label>Strategy:</label>
          <input type='text' name='strategy' onChange={handleChange}/>
          </div>
            <div>
            <label>Mistake:</label>
          <input type='text' name='mistake' onChange={handleChange}/>
          </div>
          <div>
            <label>Imagem15:</label>
          <input type='file' name='imagem15' onChange={handleImageChange}/>
          </div>
          <div>
            <label>Note:</label>
            <input type='text' name='note' onChange={handleChange} className='h-20'/>
          </div>
        </div>
      </form>
      <div className='max-w-full flex justify-center'>
        <button className='bg-blue-500 p-2 rounded-md mx-auto text-white hover:bg-blue-900'
        onClick={sentimage}>AddData</button>
      </div>
    </div>
  )
}

export default AdddataPage