import React from 'react'
import PieChart from '../../components/charts/PieChart';
import { getCategories } from '../commodity/commoditySlice';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { Table } from 'flowbite-react'
import Progress from '../../components/ui/Progress';

const DayReportChart = (props) => {
  let chart
  const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
  ]
  let soldByCategory = []
  let soldByCategoryFull = []

  const categories = useSelector(getCategories)
  // 移除「全部」的選項
  const delIndex = categories.findIndex(el => el === '全部')
  if (delIndex > -1) categories.splice(delIndex, 1)
  //
  if (categories.length > 0 && props.data) {
    // 把今天的資料拆開，並把所有賣掉的品項組成一個 Array
    let rowData = []
    props.data.forEach(el => rowData = rowData.concat(el.contents))
    // 找出每個分類有幾個
    categories.forEach((title, idx) => {
      soldByCategory.push(rowData.filter(el => el.categories.includes(title)).length)
      soldByCategoryFull.push({ title: title, color: colors[idx], value: rowData.filter(el => el.categories.includes(title)).length })
    })
    //
    soldByCategoryFull.sort((a, b) => b.value - a.value)

    const data = {
      labels: categories,
      datasets: [
        {
          data: soldByCategory,
          backgroundColor: colors,
          datalabels: {
            render: 'label',
            align: 'top',
            color: 'rgba(54, 162, 235, 0)',
          },
        }
      ]
    }
    chart = (<PieChart data={data} />)
  }

  return (
    <div>
      <div className="grid place-items-center">
        <div className="w-80">
          {chart}
        </div>
      </div>
      <Table className="mt-4">
        <Table.Head>
          <Table.HeadCell>分類</Table.HeadCell>
          <Table.HeadCell>數量</Table.HeadCell>
          <Table.HeadCell>比例</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {soldByCategoryFull.map((e, idx) => {
            const percent = Math.round(e.value/soldByCategoryFull.reduce((s,c) => s + c.value, 0)*100)
            return (
              <Table.Row key={`row_${e.title}_${idx}`}>
                <Table.Cell>{e.title}</Table.Cell>
                <Table.Cell>{e.value}</Table.Cell>
                <Table.Cell>
                  <div className="inline-flex">
                    <span>{percent}%</span>
                    <div className="w-5 self-center ml-2"><Progress progress={percent} color={e.color} size="sm"/></div>
                  </div>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

DayReportChart.propTypes = {
  data: propTypes.array
}
export default DayReportChart