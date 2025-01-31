import React from 'react'
import Sidebar from './components/sidebar'

const Layout = ({children}) => {
  return (
    <div className='flex '>
        <div>
            <Sidebar/>
        </div>
        
        <div className='w-full'>
            {children}
        </div>
      
    </div>
  )
}

export default Layout
