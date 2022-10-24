import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  Table,
  Pagination,
  Badge,
  Button,
  Select,
} from "flowbite-react";
import { db } from "../../../app/db";
import { useLiveQuery } from "dexie-react-hooks";
import { getCategories } from '../../commodity/commoditySlice'
import { useSelector } from "react-redux";
import CommodityModal from "./CommodityModal";

const SettingCommodity = () => {
  const [slice, setSlice] = useState(0);
  const perPage = 10;

  // get Data
  const data = useLiveQuery(async () => {
    return await db.commodities.filter(e => !e.deletedAt).toArray();
  });

  // options
  const [selectedCategory, setSelectedCategory] = useState('全部') 
  const categories = useSelector(getCategories)
  const optionsDiv = categories.map(el => (<option key={`categroies_option_${el}`} value={el}>{el}</option>))

  useEffect(() => {
    setSlice(0);
  }, [selectedCategory])
  // renderTable
  let tableDiv;
  let pagenationDiv;
  function renderTable() {
    let filteredData = data
    if (selectedCategory !== '全部') filteredData = data.filter(el => el.categories.includes(selectedCategory))
    const slicedData = filteredData.slice(slice, slice + perPage);
    tableDiv = slicedData.map((el) => {
      const badgeDiv = el.categories.map((e) => (
        <Badge color="info" key={`badge_${el.id}_${e}`}>
          {e}
        </Badge>
      ));
      return (
        <Table.Row
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
          key={`table_row_${el._id}`}
        >
          <Table.Cell className="max-w-xs whitespace-nowrap truncate font-medium text-gray-900 dark:text-white">
            {el.name}
          </Table.Cell>
          <Table.Cell>
            <div className="whitespace-nowrap flex flex-wrap gap-1">{badgeDiv}</div>
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-blue-500">
            {el.price.currency()}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-blue-600 dark:text-blue-500">
            <span onClick={() => detailModal.current.open(el)}>編輯</span>
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
        <div className="md:flex justify-between">
          <div>
            <p className="my-4">商品設定</p>
          </div>
          <div className="inline-flex gap-2">
            <div className="w-36">
              <Select id="countries" onChange={e => setSelectedCategory(e.target.value)}>
                {optionsDiv}
              </Select>
            </div>
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
