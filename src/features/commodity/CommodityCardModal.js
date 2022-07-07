import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import { Modal, Button } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { getCommodityBySelected, selectCommodity } from './commoditySlice'
import { insertToOrder } from './orderSlice'
import _ from 'lodash'

const CommodityCardModal = () => {
  const dispatch = useDispatch()
  const commodity = useSelector(getCommodityBySelected)
  const [show, setShow] = useState(false)
  const [order, setOrder] = useState({})
  let specDiv = []

  useEffect(() => {
    if (commodity) {
      setShow(true)
      setOrder({ ...commodity, specification: [], _id: nanoid() })
    }
  }, [commodity])

  function removeFromOrderSpecification(payload) {
    // 移除所選的項目
    const idx = order.specification.findIndex((el) => el.name === payload.name)
    let splicedSpec = order.specification
    splicedSpec.splice(idx, 1)
    setOrder({ ...order, specification: splicedSpec })
  }

  function insertToOrderSpecification(payload, type = null) {
    // 新增所選的項目
    let specification = order.specification
    if (type === 'single') {
      // 若是單選
      // 先清空同個 category 下的項目
      _.remove(specification, (n) => n.category === payload.category)
    }
    specification.push(payload)
    specification.sort((a, b) => a.index - b.index)
    setOrder({ ...order, specification: specification })
  }

  // 建立訂單的規格
  if (commodity?.specification) {

    commodity.specification.forEach((item, idx) => {
      const detailDiv = []
      if (item.value && item.type) {
        item.value.forEach((detail, detailIdx) => {
          switch (item.type) {
            case 'single':
              // 只能單選
              if (
                order.specification &&
                order.specification.some((el) => el.name === detail.name)
              ) {
                // 已經被選取的按鈕，再次點擊要取消選取
                detailDiv.push(
                  <div
                    className="inline-flex mt-1"
                    key={`option_radio_${detail.name}_${detailIdx}`}
                  >
                    <Button
                      gradientDuoTone="purpleToBlue"
                      className="mr-1"
                      onClick={() => removeFromOrderSpecification(detail)}
                    >
                      {detail.name}
                      {detail?.price ? `(+ $${detail.price})` : ''}
                    </Button>
                  </div>
                )
              } else {
                // 尚未被選取的按鈕
                detailDiv.push(
                  <div
                    className="inline-flex mt-1"
                    key={`option_radio_${detail.name}_${detailIdx}`}
                  >
                    <button
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      onClick={() =>
                        insertToOrderSpecification(
                          { ...detail, category: item.name, index: idx },
                          'single'
                        )
                      }
                    >
                      <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {detail.name}
                        {detail?.price ? `(+ $${detail.price})` : ''}
                      </span>
                    </button>
                  </div>
                )
              }
              break
            case 'multi':
              if (
                order.specification &&
                order.specification.some((el) => el.name === detail.name)
              ) {
                // 已經被選取的按鈕，再次點擊要取消選取
                detailDiv.push(
                  <div
                    className="inline-flex mt-1"
                    key={`option_radio_${detail.name}_${detailIdx}`}
                  >
                    <Button
                      gradientDuoTone="purpleToBlue"
                      className="mr-1 mb-2"
                      onClick={() => removeFromOrderSpecification(detail)}
                    >
                      {detail.name}
                      {detail?.price ? `(+ $${detail.price})` : ''}
                    </Button>
                  </div>
                )
              } else {
                // 尚未被選取的按鈕
                detailDiv.push(
                  <div
                    className="inline-flex mt-1"
                    key={`option_radio_${detail.name}_${detailIdx}`}
                  >
                    <button
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      onClick={() =>
                        insertToOrderSpecification({
                          ...detail,
                          category: item.name,
                          index: idx,
                        })
                      }
                    >
                      <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {detail.name}
                        {detail?.price ? `(+ $${detail.price})` : ''}
                      </span>
                    </button>
                  </div>
                )
              }
              break
          }
        })
      }
      specDiv.push(
        <div key={`spec_item_${item.name}_${idx}`}>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {item.name}
          </p>
          {detailDiv}
        </div>
      )
    })
  }

  // 取消及右上打叉按鈕：關閉 Modal
  function onClose() {
    dispatch(selectCommodity(null))
    setShow(false)
  }

  // 加入訂單按鈕：將訂單新增至 redux
  function insertToOrderEvent() {
    dispatch(insertToOrder(order))
    onClose()
  }

  return (
    <React.Fragment>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>{commodity?.name}</Modal.Header>
        <Modal.Body>
          <div className="space-y-2">{specDiv}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="w-24" onClick={insertToOrderEvent}>
            加入訂單
          </Button>
          <Button color="gray" onClick={onClose}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

// CommodityCardModal.propTypes = {}

export default CommodityCardModal
