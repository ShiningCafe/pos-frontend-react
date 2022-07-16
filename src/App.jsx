import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import TestPage from './pages/test'
import Commodity from './features/commodity/Commodity'
import DayReport from './features/report/DayReport'
import MonthReport from './features/report/MonthReport'
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
        <Route index element={<TestPage />}></Route>
        <Route path="/commodity" element={<Commodity />}></Route>
        <Route path="/day-report" element={<DayReport />}></Route>
        <Route path="/month-report" element={<MonthReport />}></Route>
      </Route>
    </Routes>
  )
}

export default App
