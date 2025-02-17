import React from 'react'
import OverView from '../components/dashboard-details/over-view'
import SalesBarChart from '../components/dashboard-details/bar-chart'

const page = () => {
  return (
    <div  className='h-[1000px]' >
        <div>
        <OverView/>
        </div>
        <div  >
        <SalesBarChart/>
        </div>
        <div className='flex  gap-20' >
          
        </div>
      
    </div>
  )
}

export default page
