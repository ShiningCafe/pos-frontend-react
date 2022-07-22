// 負責控制 sidebar 的項目
const SidebarList = [
  {
    title: '首頁',
    icon: 'HomeIcon',
    path: '/',
  },
  {
    title: '商品',
    icon: 'ViewGridAddIcon',
    // label: '99+',
    path: '/commodity',
  },
  {
    title: '統計',
    icon: 'DocumentReportIcon',
    child: [
      {
        title: '日報表',
        path: '/day-report',
      },
      {
        title: '月報表',
        path: '/month-report',
      },
    ]
  },
  {
    title: '設定',
    icon: 'CogIcon',
    child: [
      {
        title: '商品設定',
        path: '/setting/commodity'
      }
    ]
  }
]

export default SidebarList
