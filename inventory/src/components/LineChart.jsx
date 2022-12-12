import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
const LineChart = ({lineInput}) => {

  return (
    <Line data={lineInput} width={400} height={400} options={{
        maintainAspectRatio: false,
        plugins: {
            title: {
              font: {
                size: 18
              },
              display: true,
              text: "MONTHLY PROFIT",
              align: "center"
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
        
    }}/>
  )
}

export default LineChart
