import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
// import TestPage from './pages/test'
import Dashboard from './features/dashboard/Dashboard'
import Commodity from './features/commodity/Commodity'
import DayReport from './features/report/DayReport'
import MonthReport from './features/report/MonthReport'
import SettingCommodity from './features/setting/SettingCommodity'
import SettingCommodityFullpage from './features/setting/SettingCommodityFullpage'
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
        <Route path="/setting/commodity" element={<SettingCommodity />}></Route>
        <Route path="/setting/commodity/:id" element={<SettingCommodityFullpage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
