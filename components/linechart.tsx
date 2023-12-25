"use client";
import { NextPage } from "next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface Props {
    number:Array<number>
    balance:Array<number>
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Dashboard',
    },
  },
};


const linechart:NextPage<Props> = (Props) => {
    const labels = Props.number
    const balance = Props.balance
    const data = {
  labels,
  datasets: [
    {
      label: 'data',
      data: balance,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};
  return (
    <div className="max-w-3xl bg-white rounded-lg p-2 my-2">
        <Line options={options} data={data} />
    </div>
  )
}

export default linechart