import React from 'react'
import { Card } from 'flowbite-react'
// db
import { db } from '../../app/db'
import { useLiveQuery } from "dexie-react-hooks";
// others
import dayjs from 'dayjs'

const MonthReport = () => {
  //
  // 從資料庫撈資料  
  //
  const originData = useLiveQuery(async () => {
    const startDate = dayjs('2022/08/01').format('YYYY/MM') + '/01'
    const endDate = dayjs('2022/08/01').format('YYYY/MM') + '/' + dayjs().daysInMonth()
    return await db.orders.where('createdAt').between(new Date(`${startDate} 00:00:00`), new Date(`${endDate} 23:59:59`)).toArray();
  })
  const data = originData ? originData.filter(el => el.voidedAt === null) : []

  console.log(data)
  //
  // 狀態
  //
  let status = {
    totalIncome: 0,
    totalOrder: 0,
    perPrice: 0
  }
  function processStatus () {
    status.totalIncome = data.reduce((sum, c) => sum + c.price, 0)
    status.totalOrder = data.length
    let perPrice = status.totalIncome / status.totalOrder
    status.perPrice = perPrice > 0 ? perPrice.toFixed(2) : 0
  }

  if (data) {
    processStatus()
    console.log(status.perPrice)
  }

  return (
    <div className="px-4 pt-6 pb-2">
      <div className="grid grid-cols-1 gap-4 mt-4 w-full md:grid-cols-3">
        <Card>
          <p>本月營收</p>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
            ${status.totalIncome.currency()}
          </span>
        </Card>
        <Card>
          <p>月訂單數</p>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
          {status.totalOrder}
          </span>
        </Card>
        <Card>
          <p>月平均客單價</p>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
          {status.perPrice.currency()}
          </span>
        </Card>
      </div>
      <div className="my-2">
        <Card>
          <p>營收狀況</p>
          <div>
          {/* {chartDiv} */}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MonthReport