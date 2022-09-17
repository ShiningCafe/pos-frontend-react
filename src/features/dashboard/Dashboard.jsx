import React from 'react'
import Card from '../../components/ui/Card'
// import Button from '../../components/ui/Button'

const Dashboard = () => {
  return (
    <div className="px-4 pt-6 pb-2 font-sans">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <Card className="text-center md:col-span-2">
          <div className="my-3">
            ✨目前為早期測試版本，詳細更新規劃情詳見<a className="text-blue-700 px-1" href="https://pos.shiningcafe.com/" target="blank">官方網站</a>✨<br/>
            現存版本資料皆保存在客戶端，並不會上傳至伺服器亦無法與其他設備同步。
            若發現 bug 需要回報也請至官方網站填寫表單，感謝🙏
          </div>
          {/* <div className="my-3">您好，歡迎使用🎉</div>
          <Button className="bg-violet-600 text-white font-bold hover:bg-violet-100">建立範本</Button> */}
        </Card>
        <Card className="grid"><div className="place-self-center font-bold text-lg text-gray-500">版本 v0.1.09171</div></Card>
        {/*  */}

      </div>
    </div>
  )
}

export default Dashboard