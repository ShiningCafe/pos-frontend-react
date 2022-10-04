import React from 'react'
import propTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  Filler,
)

const LineChart = (props) => {
  const options = {
    ...props.options,
    responsive: true,
    lineTension: 0.1,
    maintainAspectRatio: false,
  }
  return <Line data={props.data} options={options} height={240}/>
}

LineChart.propTypes = {
  data: propTypes.object,
  options: propTypes.object,
}

export default LineChart
