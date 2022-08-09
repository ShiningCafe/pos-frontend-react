import React from 'react'
import PropTypes from 'prop-types'

const Card = props => {
  return (
    <div className={props.className + " p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"}>
      {props.children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node
}

export default Card