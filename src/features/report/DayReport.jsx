import React from 'react'
// flowbite UI
import { Card, Table } from 'flowbite-react'
// db
import { db } from '../../app/db'
import { useLiveQuery } from "dexie-react-hooks";
// others
import dayjs from 'dayjs'
//
import LineChart from '../../components/LineChart';
import ItemDoughnutChart from './ItemDoughnutChart';
import ItemDistributed from './ItemDistributed';

const DayReport = () => {

  //
  // 從資料庫撈資料  
  //
  const data = useLiveQuery(async () => {
    const today = dayjs().format('YYYY/MM/DD')
    return await db.orders.where('createdAt').between(new Date(`${today} 00:00:00`), new Date(`${today} 23:59:59`)).toArray();
  })

  //
  // 製造表格的內容 DIV
  //
  let recordDiv = []
  function renderTable () {
    data.reverse()
    data.forEach((order) => {
      order.contents.forEach((item, idx) => {
        const specPrice = item.specification.reduce((sum, c) => {
          if (c.price) {
            return sum += c.price
          } else {
            return sum
          }
        }, item.price)
        recordDiv.push(
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={`table_row_${order._id}_${idx}`}>
            <Table.Cell className="font-bold">
            { idx === 0 ? `${order.serial}` : '' }
            </Table.Cell>
            <Table.Cell>{ idx === 0 ? `$${order.price}` : '' }</Table.Cell>
            <Table.Cell>${ specPrice }</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{ item.name }</Table.Cell>
            <Table.Cell>{ idx === 0 ? dayjs(order.createdAt).format('HH:mm:ss') : '' }</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-blue-600 dark:text-blue-500">
            詳細
            </Table.Cell>
          </Table.Row>
        )
      })
    })
  }

  //
  // 圖表 - 營業狀態
  //
  let chartDiv
  function renderChart () {
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    const totalPricePerHour = []
    const totalOrderPerHour = []
    let maxOrderPerHour = 0
    hours.forEach(h => {
      const filter = data.filter(el => h === parseInt(dayjs(el.createdAt).format('HH')))
      totalOrderPerHour.push(filter.length)
      if (filter.length > maxOrderPerHour) maxOrderPerHour = filter.length
      if (filter.length > 0) {
        totalPricePerHour.push(filter.reduce((sum, c) => sum + c.price, 0))
      } else {
        totalPricePerHour.push(0)
      }
    })
    const chartData = {
      labels: hours,
      datasets: [
        {
          data: totalPricePerHour,
          label: '營業額',
          borderColor: '#3e95cd',
          backgroundColor: '#3e95cd66',
          datalabels: {
            render: 'label',
            align: 'top',
            color: '#36A2EB',
          },
          yAxisID: 'y_price',
        },
        {
          data: totalOrderPerHour,
          label: '單量',
          borderColor: "#3cba9f",
          backgroundColor: '#3cba9f66',
          fill: true,
          datalabels: {
            render: 'label',
            align: 'top',
            color: '#3cba9f',
          },
          yAxisID: 'y_orders',
        }
      ]
    }
    const chartOptions = {
      scales: {
        y_price: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y_orders: {
          type: 'linear',
          display: false,
          position: 'right',
          max: maxOrderPerHour * 2,
        },
      }
    }
    chartDiv = (<LineChart data={chartData} options={chartOptions}/>)
  }

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
    status.perPrice = perPrice.toFixed(2)
  }

  if (data) {
    renderTable()
    renderChart()
    processStatus()
  }

  return (
    <div className="px-4 pt-6 pb-2">
      <div className="grid grid-cols-1 gap-4 mt-4 w-full md:grid-cols-3">
        <Card>
          <p>本日營收</p>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
            ${status.totalIncome}
          </span>
        </Card>
        <Card>
          <p>訂單數</p>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
          {status.totalOrder}
          </span>
        </Card>
        <Card>
          <p>客單價</p>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
          {status.perPrice}
          </span>
        </Card>
      </div>
      <div className="my-2">
        <Card>
          <p>營收狀況</p>
          <div>
          {chartDiv}
          </div>
        </Card>
      </div>
      <div className="my-2 grid grid-cols-2 gap-2 w-full">
        <Card>
          <p>銷售分佈-圖表</p>
          <div>
          <ItemDoughnutChart data={data}/>
          </div>
        </Card>
        <Card>
          <p>銷售分佈-百分比</p>
          <div className="h-full">
            <ItemDistributed data={data}/>
          </div>
        </Card>
      </div>
      <div className="my-2">
        <Card>
          <p>交易紀錄</p>
          <Table>
            <Table.Head>
              <Table.HeadCell>單號</Table.HeadCell>
              <Table.HeadCell>總價</Table.HeadCell>
              <Table.HeadCell>單價</Table.HeadCell>
              <Table.HeadCell>品項</Table.HeadCell>
              <Table.HeadCell>時間</Table.HeadCell>
              <Table.HeadCell>操作</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {recordDiv}
            </Table.Body>
          </Table>
        </Card>
      </div>
    </div>
  )
}

export default DayReport
