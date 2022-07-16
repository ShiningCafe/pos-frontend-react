import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Progress } from "flowbite-react";
const ItemDistributed = (props) => {
  let groupRowDataDiv;
  if (props.data) {
    // 將所有項目攤平成一個 Array
    let rowData = [];
    props.data.forEach((el) => (rowData = rowData.concat(el.contents)));
    // 依照品名分類 => { '綠茶': Array(1), '紅茶': Array(2) ... }
    const groupRowData = _.groupBy(rowData, (el) => el.name);
    // 整理分類的內容 => [{ title: '綠茶', count: 1 },{ title: '紅茶', count: 2 }...]
    const groupRowDataPercent = Object.keys(groupRowData).map((key) => { return { name: key, conut: groupRowData[key].length} })
    // 依照銷售(count)數量排序
    groupRowDataPercent.sort((a, b) => b.conut - a.conut)
    //
    // 組合出 DIV
    groupRowDataDiv = groupRowDataPercent.map(el => {
      // 計算百分比
      const percent = el.conut / rowData.length * 100
      return (
        <div key={`progress_${el.name}`} className="my-3">
          <p className="pb-1">
            {el.name} <span className="text-xs text-gray-500">{`(${el.conut}/${rowData.length}，${percent.toFixed(1)}%)`}</span>
          </p>
          <Progress progress={percent} color="dark" size="sm"/>
        </div>
      );
    });
  }
  return <div>{groupRowDataDiv}</div>;
};

ItemDistributed.propTypes = {
  data: PropTypes.array,
};

export default ItemDistributed;
