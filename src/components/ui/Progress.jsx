import React from 'react'
import PropTypes from 'prop-types'

const Progress = props => {
  return (
    <div className="w-full bg-gray-200 rounded-sm h-2 dark:bg-gray-700">
      <div className="h-2 rounded-sm" style={{width: props.progress + '%', background: props.color }}></div>
    </div>
  )
}

Progress.propTypes = {
  color: PropTypes.string,
  progress: PropTypes.number
}

export default Progress