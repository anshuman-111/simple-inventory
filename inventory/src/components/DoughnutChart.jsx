import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
const DoughnutChart = ({input}) => {

  return (
    <Doughnut data={input} width={400} height={400} options={{
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            font: {
              size: 18
            },
            text: "PERCENTAGE OF PROFIT FOR TOP 5 PRODUCTS",
            align: "center"
          },
          animation : {
            animateScale: true,
            animateRotate: true
        },
        datalabels: {
          formatter: (value) => {
            return value + '%';
          }
        }
        }
      }}/>
  )
}

export default DoughnutChart
