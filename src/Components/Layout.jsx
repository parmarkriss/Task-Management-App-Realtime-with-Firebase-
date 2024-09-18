import React from 'react'
import Hearder from './Hearder'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <div>
       <Hearder/>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout
