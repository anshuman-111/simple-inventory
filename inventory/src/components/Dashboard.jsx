import React from 'react'

const Dashboard = () => {

    const renders = [{
        id: 1,
        type: 'overall stats'
    },
    {
        id: 2,
        type: 'bar chart with options'
    },
    {
        id: 3,
        type: 'economic order stats'
    }]


  return (
    <div>
        <div className='mt-5 grid gap-20 md:gap-48 sm:grid-cols-3 grid-cols-1'>
            {renders.map(({id, type}) => 
            <div className='p-5 hover:bg-white hover:scale-105 duration-200 hover:text-black w-36 h-36 bg-gray-400 text-white rounded-2xl' key={id}>{type}</div> )}
            
        </div>
    </div>
  )
}

export default Dashboard