import React from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
const LineChart = ({lineInput}) => {

  return (
    <Bar data={lineInput} width={400} height={400} options={{maintainAspectRatio: false}}/>
  )
}

export default LineChart
