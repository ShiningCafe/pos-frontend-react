import React, { useState } from 'react'

import { Button, Modal, Table } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder, dumpOrder, spliceOrder, checkoutOrder } from './orderSlice'

const CommodityOrderCheck = () => {
  const dispatch = useDispatch()
  let order = [...useSelector(getOrder)]
  const [show, setShow] = useState(false)
  let buttonDiv
  let tableRowDiv
  let totalPrice

  // 有內容才生成「結帳」按鈕及「明細」
  if (order.length > 0) {
    totalPrice = order.reduce((pre, item) => {
      // 計算規格裡的價格
      const specPrice = item.specification.reduce((p, i) => {
        if (i.price) return p + i.price
        return p
      }, 0)
      //
      return pre + item.price + specPrice
    }, 0)
    buttonDiv = (
      <Button
        onClick={onOpen}
        gradientDuoTone="pinkToOrange"
        className="fixed bottom-0 right-0 mx-2 mb-6 z-50"
      >
        結帳 ${totalPrice}
      </Button>
    )
    tableRowDiv = order.map((item) => {
      // 計算規格的文字
      let textSpecList = ''
      item.specification.forEach(e => {
        if (e.price) {
          textSpecList += ` ${e.name}+$${e.price}`
        } else {
          textSpecList += ` ${e.name}`
        }
      })

      // 計算包含規格的價格
      const textPriceWithSpec = item.price + item.specification.reduce((p, i) => {
        if (i.price) return p + i.price
        return p
      }, 0)

      return (
        <Table.Row key={`order_table_row_${item._id}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {item.name}
          </Table.Cell>
          <Table.Cell>{textSpecList}</Table.Cell>
          <Table.Cell>${textPriceWithSpec}</Table.Cell>
          <Table.Cell>
            <a
              onClick={() => removeFromOrderById(item._id)}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              刪除
            </a>
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  function removeFromOrderById (_id) {
    dispatch(spliceOrder(_id))
  }

  function onOpen() {
    setShow(true)
  }

  function onClose() {
    setShow(false)
  }

  function checkout() {
    dispatch(checkoutOrder())
    onClose()
  }

  function dumpOrderEvent () {
    dispatch(dumpOrder())
    onClose()
  }

  return (
    <React.Fragment>
      {buttonDiv}
      <Modal show={show} onClose={onClose}>
        <Modal.Header>結帳</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Table>
              <Table.Head>
                <Table.HeadCell>品項</Table.HeadCell>
                <Table.HeadCell>規格</Table.HeadCell>
                <Table.HeadCell>價格</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">修改</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {tableRowDiv}
              </Table.Body>
            </Table>
            <p className="text-right text-lg">共 {order.length} 件，總計 $ <b>{totalPrice}</b></p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <div className="inline-flex">
            <Button className="w-24" onClick={checkout}>
              結帳
            </Button>
            <Button className="w-24" color="gray" onClick={onClose}>
              取消
            </Button>
          </div>
          <Button className="text-red-600" color="gray" onClick={dumpOrderEvent}>
            清空訂單
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

export default CommodityOrderCheck
