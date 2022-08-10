import React from 'react'
import PropTypes from 'prop-types'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = props => {
  const options = {
    ...props.options,
    responsive: true,
  }
  return (
    <Pie data={props.data} options={options} height={40}/>
  )
}

PieChart.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
}

export default PieChart