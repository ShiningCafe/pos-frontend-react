import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import { Card, ToggleSwitch, Table } from 'flowbite-react'
// db
import { db } from '../../app/db'
import { useLiveQuery } from "dexie-react-hooks";
// others
import dayjs from 'dayjs'
import LineChart from '../../components/LineChart';
import ItemDoughnutChart from './ItemDoughnutChart';
import ItemDistributed from './ItemDistributed';
// import ItemDetailModal from './ItemDetailModal';

const MonthReport = () => {
  const navigate = useNavigate()
  const year = dayjs().format('YYYY')
  const month = dayjs().format('MM')

  //
  // 從資料庫撈資料  
  //
  const originData = useLiveQuery(async () => {
    const startDate = `${year}/${month}/01`
    const endDate = `${year}/${month}/${dayjs(`${year}/${month}`).daysInMonth()}`
    return await db.orders.where('createdAt').between(new Date(`${startDate} 00:00:00`), new Date(`${endDate} 23:59:59`)).toArray();
  })
  const data = originData ? originData.filter(el => el.voidedAt === null) : []

  //
  // 狀態
  //
  let status = {
    totalIncome: 0,
    totalOrder: 0,
    perPrice: 0,
    avgIncome: 0,
  }

  function processStatus () {
    status.totalIncome = data.reduce((sum, c) => sum + c.price, 0)
    status.totalOrder = data.length
    let perPrice = status.totalIncome / status.totalOrder
    status.perPrice = perPrice > 0 ? perPrice.toFixed(2) : 0
    status.avgIncome = Math.round((status.totalIncome /_.size(_.groupBy(data, el => dayjs(el.createdAt).format('YYYY/MM/DD')))))
  }

  //
  // 營收圖表
  //
  const [showOnlyIncome, setShowOnlyIncome] = useState(false)
  let chartDiv

  function renderChart () {

    const days = []
    for (let i = 1; i <= dayjs(`${year}/${month}`).daysInMonth(); i++) {
      if (!showOnlyIncome) {
        // 顯示全部
        days.push(i)
      } else {
        // 顯示只有營收的日期
        if (data.some(el => dayjs(el.createdAt).isSame(dayjs(`${year}/${month}/${i}`), 'day'))) days.push(i)
      }
    }
    const totalPricePerDay = []
    const totalOrderPerDay = []
    let maxOrderAmount = 0
    let avgPrice = new Array(dayjs(`${year}/${month}`).daysInMonth())
    let workedDay = 0
    days.forEach(date => {
      const filter = data.filter(d => {
        return dayjs(d.createdAt).isSame(dayjs(`${year}/${month}/${date}`), 'day')
      })
      totalPricePerDay.push(filter.reduce((sum, c) => sum + c.price, 0))
      totalOrderPerDay.push(filter.length)
      if (filter.length > 0) workedDay = workedDay + 1
      if (filter.length > maxOrderAmount) maxOrderAmount = filter.length
    })
    avgPrice.fill((status.totalIncome / workedDay).toFixed(2))

    const chartData = {
      labels: days,
      datasets: [
        {
          data: totalPricePerDay,
          label: '營業額',
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgb(54, 162, 235, .3)',
          datalabels: {
            render: 'label',
            align: 'top',
            color: 'rgb(54, 162, 235)',
          },
          yAxisID: 'y_price',
        },
        {
          data: totalOrderPerDay,
          label: '單量',
          borderColor: "rgba(255, 99, 132, .6)",
          backgroundColor: 'rgba(255, 99, 132, .6)',
          // fill: true,
          datalabels: {
            render: 'label',
            align: 'top',
            color: 'rgb(255, 99, 132)',
          },
          yAxisID: 'y_orders',
        },
        {
          data: avgPrice,
          label: `平均 (${avgPrice[0]})`,
          borderColor: "#66d2d5",
          backgroundColor: '#66d2d533',
          borderDash: [10, 5],
          pointRadius: 0,
          // fill: true,
          datalabels: {
            display: false,
          },
          yAxisID: 'y_price',
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
          max: maxOrderAmount * 2,
        },
      }
    }
    chartDiv = (<LineChart data={chartData} options={chartOptions}/>)
  }
  
  //
  // 渲染底下日期的表單
  //
  let dailyDiv = []

  function renderDailyDiv () {
    const dataGB = _.groupBy(data, el => dayjs(el.createdAt).format('YYYY/MM/DD'))
    _.each(dataGB, (dataset, date) => {
      const sum = dataset.reduce((sum, c) => sum + c.price, 0)
      dailyDiv.push(
        <Table.Row className="bg-white dark:border-gray-900 dark:bg-gray-800" key={`table_row_${date}`}>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900">{date}</Table.Cell>
          <Table.Cell>{dataset.length}</Table.Cell>
          <Table.Cell>{(sum/dataset.length).toFixed(0).currency()}</Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sum.currency()}</Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-blue-600 dark:text-blue-500">
            <span onClick={() => navigate(`/day-report?date=${date}`)}>查看</span>
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  //

  if (data) {
    processStatus()
    renderChart()
    renderDailyDiv()
  }

  return (
    <div className="px-4 pt-6 pb-2">
      <p className="text-2xl font-bold">{`${year}/${month}`} 月報表</p>
      <div className="grid grid-cols-1 gap-4 mt-4 w-full md:grid-cols-4">
        <Card>
          <p>本月營收</p>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
            ${status.totalIncome.currency()}
          </span>
        </Card>
        <Card>
          <p>總訂單數</p>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
          {status.totalOrder}
          </span>
        </Card>
        <Card>
          <p>客單價(營收/訂單)</p>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
          {status.perPrice.currency()}
          </span>
        </Card>
        <Card>
          <p>日平均</p>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
          {status.avgIncome.currency()}
          </span>
        </Card>
      </div>
      <div className="my-2">
        <Card>
          <div className="flex justify-between">
            <p>營收狀況</p>
            <ToggleSwitch
              checked={showOnlyIncome}
              label="只顯示有營收的日期"
              onChange={() => setShowOnlyIncome(!showOnlyIncome)}
            />
          </div>
          <div>
          {chartDiv}
          </div>
        </Card>
      </div>
      <div className="my-2 grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
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
              <Table.HeadCell>日期</Table.HeadCell>
              <Table.HeadCell>單量</Table.HeadCell>
              <Table.HeadCell>客單價</Table.HeadCell>
              <Table.HeadCell>營收</Table.HeadCell>
              <Table.HeadCell>連結</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {dailyDiv}
            </Table.Body>
          </Table>
        </Card>
      </div>
    </div>
  )
}

export default MonthReport