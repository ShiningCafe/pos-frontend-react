import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Modal, Button, Table } from "flowbite-react";
import { db } from "../../app/db";
import dayjs from "dayjs";

const ItemDetailModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState({});

  useImperativeHandle(ref, () => ({
    onOpen(data) {
      setOrder(data);
      setShow(true);
    },
  }));

  let tableRowDiv;

  if (order.contents) {
    tableRowDiv = order.contents.map((item, idx) => {
      // 計算規格的文字
      let textSpecList = "";
      item.specification.forEach((e) => {
        if (e.price) {
          textSpecList += ` ${e.name}+$${e.price.currency()}`;
        } else {
          textSpecList += ` ${e.name}`;
        }
      });

      // 計算包含規格的價格
      const textPriceWithSpec =
        item.price +
        item.specification.reduce((p, i) => {
          if (i.price) return p + i.price;
          return p;
        }, 0);

      return (
        <Table.Row
          key={`order_table_row_${item.name}${idx}`}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {item.name}
          </Table.Cell>
          <Table.Cell>{textSpecList}</Table.Cell>
          <Table.Cell>${textPriceWithSpec.currency()}</Table.Cell>
        </Table.Row>
      );
    });
  }

  let voidButton;
  if (!order.voidedAt) {
    voidButton = (
      <Button color="red" onClick={voidEvent}>
        將此筆訂單作廢
      </Button>
    );
  } else {
    voidButton = (
      <Button color="red" disabled>
        此筆訂單已作廢
      </Button>
    );
  }

  function onClose() {
    setShow(false);
  }

  function voidEvent() {
    if (!order) return;
    
    db.orders.update(order._id, { voidedAt: new Date() }).then(update => {
      if (update) setOrder({ ...order, voidedAt: true })
    });
    onClose();
  }

  return (
    <React.Fragment>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>訂單詳細 { `#${order.serial}` } - { dayjs(order.createdAt).format('YYYY/MM/DD HH:mm:ss') }</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {/* <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <p>時間日期: </p>
              <p className="sm:text-right">ID: { order._id }</p>
            </div> */}
            <Table>
              <Table.Head>
                <Table.HeadCell>品項</Table.HeadCell>
                <Table.HeadCell>規格</Table.HeadCell>
                <Table.HeadCell>價格</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">{tableRowDiv}</Table.Body>
            </Table>
            <p className="text-right text-lg">
              共 {order?.contents ? order.contents.length : 0} 件，總計 ${" "}
              <b>{order.price ? order.price.currency() : 0}</b>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {voidButton}
          <Button color="gray" onClick={onClose}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
});
ItemDetailModal.displayName = "ItemDetailModal";
export default ItemDetailModal;
