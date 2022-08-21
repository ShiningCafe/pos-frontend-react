import { Button } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { db } from '../app/db'
import { activeNotify } from '../layouts/notifySlice';
function TestPage() {
  const dispatch = useDispatch();
  //
  async function initDB () {
    await db.commodities.clear()
    await db.commodities.bulkAdd([
      {
        _id: '312421',
        name: '多多綠',
        categories: ['熱門商品', '特調', '茶類'],
        price: 50,
        specification: [
          {
            name: '甜度',
            type: 'single',
            required: true,
            value: [
              { name: '正常甜' },
              { name: '半糖' },
              { name: '微糖' },
              { name: '無糖' },
            ],
          },
          {
            name: '冰塊',
            type: 'single',
            required: true,
            value: [
              { name: '正常冰' },
              { name: '少冰' },
              { name: '微冰' },
              { name: '去冰' },
              { name: '溫' },
              { name: '熱', price: 10 },
            ],
          },
          {
            name: '加料',
            type: 'multi',
            value: [
              { name: '珍珠', price: 5 },
              { name: '椰果', price: 5 },
            ],
          },
          {
            name: '測試',
            type: 'multi'
          },
          {
            name: '測試２',
            value: [
              { name: '珍珠', price: 5 },
              { name: '椰果', price: 5 },
            ],
          }
        ],
      },
      {
        _id: '3124212',
        name: '超級無敵紅茶',
        categories: ['熱門商品', '茶類'],
        price: 40,
      },
      {
        _id: '312423',
        name: '高級的金萱青',
        categories: ['茶類'],
        price: 80,
      },
      {
        _id: '312424',
        name: '隱藏版烏龍',
        categories: [],
        price: 90,
      },
      {
        _id: '3124245',
        name: '百香綠',
        categories: ['新鮮果汁'],
        price: 90,
      },
      {
        _id: '31242456',
        name: '鮮橙綠',
        categories: ['新鮮果汁'],
        price: 90,
      },
      {
        _id: '31242457',
        name: '鐵觀音奶茶',
        categories: ['奶茶'],
        price: 90,
      }
    ])
    console.log('add complete')
  }

  function notifyTest () {
    dispatch(activeNotify({ type: 'warning', message: '資料已儲存'}))
  }

  return (
    <div className="px-4 pt-6 pb-2">
      <Button onClick={initDB}>INIT Commodities</Button>
      <Button onClick={notifyTest}>Notify TEST</Button>
    </div>
  )
}

export default TestPage
