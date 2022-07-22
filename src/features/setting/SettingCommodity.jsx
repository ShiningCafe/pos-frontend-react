import React, { useState, useRef } from "react";
import {
  Card,
  Table,
  Pagination,
  Badge,
  Button,
  Select,
} from "flowbite-react";
import { db } from "../../app/db";
import { useLiveQuery } from "dexie-react-hooks";
import { getCategories } from '../commodity/commoditySlice'
import { useSelector } from "react-redux";
import CommodityModal from "./CommodityModal";

const SettingCommodity = () => {
  const [slice, setSlice] = useState(0);
  const perPage = 10;

  // get Data
  const data = useLiveQuery(async () => {
    return await db.commodities.toArray();
  });

  // options
  const [selectedCategory, setSelectedCategory] = useState('全部') 
  const categories = useSelector(getCategories)
  const optionsDiv = categories.map(el => (<option key={`categroies_option_${el}`} value={el}>{el}</option>))

  // renderTable
  let tableDiv;
  let pagenationDiv;
  function renderTable() {
    let filteredData = data
    if (selectedCategory !== '全部') filteredData = data.filter(el => el.categories.includes(selectedCategory))
    const slicedData = filteredData.slice(slice, slice + perPage);
    tableDiv = slicedData.map((el) => {
      const badgeDiv = el.categories.map((e) => (
        <Badge color="blue" key={`badge_${el.id}_${e}`}>
          {e}
        </Badge>
      ));
      return (
        <Table.Row
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
          key={`table_row_${el._id}`}
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {el.name}
          </Table.Cell>
          <Table.Cell>
            <div className="flex flex-wrap gap-1">{badgeDiv}</div>
          </Table.Cell>
          <Table.Cell className="font-medium text-gray-900 dark:text-blue-500">
            {el.price}
          </Table.Cell>
          <Table.Cell className="font-medium text-blue-600 dark:text-blue-500">
            <span onClick={() => detailModal.current.open(el)}>詳細</span>
          </Table.Cell>
        </Table.Row>
      );
    });
    // 分頁
    if (perPage < filteredData.length) {
      pagenationDiv = (
        <Pagination
          currentPage={Math.ceil(slice / perPage) + 1}
          totalPages={Math.ceil(filteredData.length / perPage)}
          onPageChange={(val) => onPageChange(val)}
        />
      );
    }
  }

  function onPageChange(val) {
    if (!val) return;
    setSlice(Math.ceil((val - 1) * perPage));
  }

  if (data) {
    renderTable();
  }
  const detailModal = useRef()

  return (
    <div className="px-4 pt-6 pb-2">
      <CommodityModal ref={detailModal} />
      <Card>
        <div className="flex justify-between">
          <div>
            <p>商品設定</p>
          </div>
          <div className="inline-flex gap-2">
            <Select id="countries"className="w-36" onChange={e => setSelectedCategory(e.target.value)}>
              {optionsDiv}
            </Select>
            <Button onClick={() => detailModal.current.open(null)}>新增商品</Button>
          </div>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>名稱</Table.HeadCell>
            <Table.HeadCell>分類</Table.HeadCell>
            <Table.HeadCell>價格</Table.HeadCell>
            <Table.HeadCell>詳細</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">{tableDiv}</Table.Body>
        </Table>
        <div className="text-center">{pagenationDiv}</div>
      </Card>
    </div>
  );
};

export default SettingCommodity;
