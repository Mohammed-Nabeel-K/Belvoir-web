import React from 'react'
import OverView from '../../../components/delivery/dashboard-overview/over-view'
import Ordertable from "../../../components/ui/tailor-order-table/ordertable";




const page = () => {
  return (
    <div className=''>
        <div className=""><OverView/></div>
        <div className="overflow-auto"><Ordertable height="overflow-x-auto" /></div>
        
    </div>
  )
}

export default page