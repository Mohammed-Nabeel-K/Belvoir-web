import React from 'react'
import OverView from '../components/dashboard-details/over-view'
import SalesBarChart from '../components/dashboard-details/bar-chart'
import TopProductsTable from '../components/dashboard-details/Top-products'

const page = () => {
  return (
    <div  >
        <div>
        <OverView/>
        </div>
        <div  >
        <SalesBarChart/>
        </div>
        <div className='flex  gap-20' >
            <TopProductsTable/> <TopProductsTable/>
        </div>
      
    </div>
  )
}

export default page
