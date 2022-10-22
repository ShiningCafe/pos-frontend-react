import React from 'react'
import Card from '../../components/ui/Card'
import { Timeline } from 'flowbite-react'
import updateLog from '../../app/updateLog'
// import Button from '../../components/ui/Button'

const Dashboard = () => {

  return (
    <div className="px-4 pt-6 pb-2 font-sans">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <Card className="text-center md:col-span-3">
          <div className="my-3">
            ✨目前為早期版本，詳細更新規劃情詳見<a className="text-blue-700 px-1" href="https://pos.shiningcafe.com/" target="blank">官方網站</a>✨<br/>
            若發現 bug 需要回報請私訊臉書粉絲專頁，感謝🙏
          </div>
          {/* <div className="my-3">您好，歡迎使用🎉</div>
          <Button className="bg-violet-600 text-white font-bold hover:bg-violet-100">建立範本</Button> */}
        </Card>
        {/*  */}
      </div>
      <Card className="mt-2">
        <p className="mb-5">更新日誌</p>
        <Timeline>
          { updateLog.map(log => {
            return (
              <Timeline.Item key={log.date}>
                <Timeline.Point />
                <Timeline.Content>
                  <Timeline.Time>
                    {log.date}
                  </Timeline.Time>
                  <Timeline.Title>
                    {`v${log.version} - ${log.title}`}
                  </Timeline.Title>
                  <Timeline.Body>
                    {log.content}
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </Card>
    </div>
  )
}

export default Dashboard