import React from 'react'
import PropTypes from 'prop-types'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = props => {
  const options = {
    ...props.options,
    responsive: true,
  }
  return (
    <Doughnut data={props.data} options={options} height={40}/>
  )
}

DoughnutChart.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
}

export default DoughnutChart