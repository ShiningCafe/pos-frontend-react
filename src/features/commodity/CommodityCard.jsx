import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { selectCommodity } from './commoditySlice'

const CommodityCard = (props) => {
  const dispatch = useDispatch()
  function onClick (item) { dispatch(selectCommodity(item))}

  return (
    <div
      onClick={() => onClick(props.item)}
      className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      {/* <a href="#">
        <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
      </a> */}
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.item.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          $ {props.item.price}
        </p>
      </div>
    </div>
  )
}

CommodityCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
}

CommodityCard.defaultProps = {
  item: {
    name: '未知名稱',
    price: '-',
  },
}

export default CommodityCard
