import React from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
const BarChart = ({barInput}) => {

  return (
    <Bar data={barInput} width={400} height={400} options={{maintainAspectRatio: false}}/>
  )
}

export default BarChart
