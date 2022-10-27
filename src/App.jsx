import { Routes, Route } from 'react-router-dom'
//
// Pages
//
import Layout from './layouts/Layout'
// import TestPage from './pages/test'
import Dashboard from './features/dashboard/Dashboard'
import Commodity from './features/commodity/Commodity'
// report
import DayReport from './features/report/DayReport'
import MonthReport from './features/report/MonthReport'
// setting
import SettingCommodity from './features/setting/commodity/SettingCommodity'
import SettingCommodityFullpage from './features/setting/commodity/SettingCommodityFullpage'
import SettingClient from './features/setting/client/SettingClient'
import SettingDebug from './features/setting/debug/Debug'
//
// redux
//
import { useDispatch } from 'react-redux'
import { getCommoditiesFromIndexedDB } from './features/commodity/commoditySlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  // 初始化 redux
  useEffect(() => {
    dispatch(getCommoditiesFromIndexedDB())
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />}></Route>
        <Route path="/commodity" element={<Commodity />}></Route>
        <Route path="/day-report" element={<DayReport />}></Route>
        <Route path="/month-report" element={<MonthReport />}></Route>
         {/* Setting */}
        <Route path="/setting/commodity" element={<SettingCommodity />}></Route>
        <Route path="/setting/commodity/:id" element={<SettingCommodityFullpage />}></Route>
        <Route path="/setting/client" element={<SettingClient />}></Route>
        <Route path="/setting/debug" element={<SettingDebug />}></Route>
      </Route>
    </Routes>
  )
}

export default App
