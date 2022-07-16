import React from 'react'
import propTypes from 'prop-types'
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = props => {
  const options = {
    ...props.options
  }
  return (
    <PolarArea data={props.data} options={options} height={40}></PolarArea>
  )
}

PolarAreaChart.propTypes = {
  data: propTypes.object,
  options: propTypes.object,
}

export default PolarAreaChart