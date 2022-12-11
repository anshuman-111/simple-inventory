import React, { useState, useEffect } from 'react'
import BarChart from './BarChart'
import LineChart from './LineChart'


const Dashboard = () => {

const [barData, setBarData] = useState([{}])
const [lineData, setlineData] = useState([{}])
const [statsBar, setStatsBar] = useState([{}])
useEffect(() => {
    fetch("/stats_charts").then((res) =>
        res.json().then((data) => {
            
            console.log(data)
            setBarData(data[0]);
            setlineData(data[1])
        })
        );
    }, []); 

useEffect(() => {

    fetch("/stats").then((res) =>
        res.json().then((data) => {

            console.log(data)
            setStatsBar(data);
        })
        );
    }, []); 
const stats = [
    {
        id: 1,
        title: 'Total Revenue',
        stats: statsBar[0]['revenue']
    },
    {
        id: 2,
        title: 'Inventory Turnover',
        stats: 124123123
    },
    {
        id: 3,
        title: 'Average Time for Turnover',
        stats: 45
    },
    {
        id: 4,
        title: 'Total Value of Inventory',
        stats: statsBar[0]['total_value']
    }

]





const [barChartData] = [{
    labels: barData.map((inp)=> inp['item_name']),
    datasets: [{
        label: "Quantity Available",
        data: barData.map((inp)=> inp['qty_avail']),
        backgroundColor: '#D36135',
    }]
}]

const [lineChartData] = [{
    type: 'horizontalBar',
    labels: lineData.map((inp)=> inp['month']),
    datasets: [{
        label: "Monthly Sales",
        data: lineData.map((inp)=> inp['sales']),
        backgroundColor: '#0B5351'
    }]
}]


  return (
    <div>
        <div name='stats-bar' className='w-auto mx-2 p-4 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-4 mt-4 h-auto rounded-2xl items-center text-xl bg-white'>
        {stats.map(({id,title,stats})=> (
            <div className='flex flex-col justify-around space-y-10 p-3'>
                <div key={id} className='text-black h-10 m-auto py-1 w-auto'>
                    {title}
                </div>
                <div className='text-black mt-5 h-1/2 text-4xl mx-auto'>
                    {stats}
                </div>
            </div>  
        ))}
                   
        </div>
       <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 rounded-2xl mt-3 bg-white mx-2 p-2 justify-around'> 
        <div className='bg-white w-auto mx-3'>
            <BarChart barInput={barChartData}/>
        </div>
        <div className='bg-white w-auto mx-3'>
            <LineChart lineInput={lineChartData}/>
        </div>
        </div>
    </div>
  )
}

export default Dashboard