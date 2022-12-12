import React, { useState, useEffect } from 'react'
import BarChart from './BarChart'
import BarChart2 from './BarChart2'
import DoughnutChart from './DoughnutChart'
import LineChart from './LineChart'


const Dashboard = () => {

const [barData, setBarData] = useState([{}])
const [bar2Data, setBar2Data] = useState([{}])
const [lineData, setlineData] = useState([{}])
const [doughData, setDoughData] = useState([{}])
const [statsBar, setStatsBar] = useState([{}])
useEffect(() => {
    fetch("/stats_charts").then((res) =>
        res.json().then((data) => {
            
            console.log(data)
            setBarData(data[0])
            setBar2Data(data[1])
            setlineData(data[2])
           setDoughData(data[3])
           console.log(data)
        })
        );
    }, []); 

useEffect(() => {

    fetch("/stats").then((res) =>
        res.json().then((data) => {
            setStatsBar(data);
        })
        );
    }, []); 
const stats = [
    {
        id: 1,
        title: 'Total Revenue',
        stats: (statsBar[0]['revenue']),
        dllr: "$"
    },
    {
        id: 2,
        title: 'Net Profit',
        stats: (statsBar[0]['profit']),
        dllr: "$"
    },
    {
        id: 3,
        title: 'Average Days in Inventory',
        stats: Math.round(statsBar[0]['inv_days'] * 10) / 10,
        unit: 'days'
    },
    {
        id: 4,
        title: 'Total Value of Inventory',
        stats: (statsBar[0]['total_value']),
        dllr: "$"
    }

]





const [barChartData] = [{
    labels: barData.map((inp)=> inp['item_name']),
    title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    datasets: [{
        label: "Quantity Available",
        data: barData.map((inp)=> inp['qty_avail']),
        backgroundColor: '#D36135',
    }]
}]

const [lineChartData] = [{
    labels: lineData.map((inp)=> inp['month']),
    datasets: [{
        label: "Monthly Profit",
        data: lineData.map((inp)=> inp['profit']),
        backgroundColor: '#0B5351'
    }]
}]

const [barChart2Data] = [{
    labels: bar2Data.map((inp)=> inp['month']),
    datasets: [{
        label: "Sales",
        data: bar2Data.map((inp)=> inp['sales']),
        backgroundColor: '#D36135',
    }]
}]

const [doughChartData] = [{
    labels: doughData.map((inp)=> inp['item_name']),
    datasets: [{
        label: "% of Profit",
        data: doughData.map((inp)=> Math.round(inp['perc'] * 10) / 10),
        backgroundColor: ['#E26D5A','#A4303F','#B82C17','#58231B','#052F5F']
    }]
}]



  return (
    
    <div className='mx-auto'>
        <div name='stats-bar' className='w-auto mx-2 p-4 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 mt-4 h-auto rounded-2xl items-center text-xl backdrop-blur-md shadow-2xl'>
        {stats.map(({id,title,stats,dllr,unit})=> (
            <div className='flex flex-col justify-around space-y-10 p-3 '>
                <div key={id} className='text-white h-10 m-auto py-1 text-lg w-auto'>
                    {title}
                </div>
                <div className='text-white mt-5 h-1/2 text-4xl mx-auto'>
                    {dllr}&nbsp;{stats}&nbsp;{unit} 
                </div>
            </div>  
        ))}
                   
        </div>
       <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 rounded-2xl mt-3 bg-white mx-2 p-2 justify-around'> 
        <div className='bg-white w-auto mx-3 my-3'>
            <BarChart barInput={barChartData}/>
        </div>
        <div className='bg-white w-auto mx-3 my-3'>
            <BarChart2 barInput={barChart2Data}/>
        </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 rounded-2xl mt-3 bg-white mx-2 p-2 justify-around'> 
        <div className='bg-white w-auto mx-3 my-3'>
            <DoughnutChart input={doughChartData}/>
        </div>
        <div className='bg-white w-auto mx-3 my-3'>
            <LineChart lineInput={lineChartData}/>
        </div>
        </div>
    </div>
  )
}

export default Dashboard