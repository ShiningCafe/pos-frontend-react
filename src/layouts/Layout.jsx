import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'

import SidebarLayout from './sidebar/SidebarLayout'
import NavbarLayout from './components/NavbarLayout'
import ToastPop from './components/ToastPop'
import CommodityOrderCheck from '../features/commodity/CommodityOrderCheck'
//
import FirstModal from './components/FirstModal'


const Layout = () => {
  return (
    <React.Fragment>
      <ScrollToTop/>
      <FirstModal />
      <CommodityOrderCheck />
      <ToastPop />
      <NavbarLayout />
      <main className="min-h-screen">
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
