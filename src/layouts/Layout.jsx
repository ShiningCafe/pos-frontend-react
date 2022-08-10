import React from 'react'
import { Outlet } from 'react-router-dom'

import SidebarLayout from './SidebarLayout'
import NavbarLayout from './NavbarLayout'
import CommodityOrderCheck from '../features/commodity/CommodityOrderCheck'


const Layout = () => {
  return (
    <React.Fragment>
      <CommodityOrderCheck />
      <NavbarLayout />
      <main>
        <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
          <SidebarLayout />
          <div
            id="main-content"
            className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
          >
            <Outlet />
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export default Layout
