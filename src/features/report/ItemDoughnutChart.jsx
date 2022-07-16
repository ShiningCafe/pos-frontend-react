import React from 'react'
import DoughnutChart from '../../components/DoughnutChart';
import { getCategories } from '../commodity/commoditySlice';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';

const DayReportChart = (props) => {
  let div
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
    let soldByCategory = []
    categories.forEach(title => {
      soldByCategory.push(rowData.filter(el => el.categories.includes(title)).length)
    })
    //
    const data = {
      labels: categories,
      datasets: [
        {
          data: soldByCategory,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
        }
      ]
    }
    div = (<DoughnutChart data={data} />)
  }

  return (
    <div>{div}</div>
  )
}

DayReportChart.propTypes = {
  data: propTypes.array
}
export default DayReportChart