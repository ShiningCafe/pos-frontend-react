import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../app/store'
import CommodityCard from './CommodityCard'

test('CommodityCard Rendered Test', () => {
  const params = {
    _id: 'test_id_id',
    name: '超級無敵紅茶',
    categories: ['熱門商品', '茶類'],
    price: 40,
  }

  render(
    <Provider store={store}>
      <CommodityCard item={params} />
    </Provider>
  )

  // 檢查是否渲染
  const item = screen.getByText(params.name)
  expect(item).toBeInTheDocument()

  // 檢查按下按鈕後是否有將參數送入 redux
  fireEvent.click(item)
  expect(store.getState().commodity.commodity).toEqual(params)

})
