import React from 'react';
import SidebarItem from './SidebarItem';
import SidebarList from './SidebarList';

function SidebarLayout () {
  return (
    <React.Fragment>
      <aside id="sidebar"  className="flex hidden fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 w-64 h-full duration-75 lg:flex transition-width" aria-label="Sidebar">
        <div className="flex relative flex-col flex-1 pt-0 min-h-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex overflow-y-auto flex-col flex-1 pt-5 pb-4">
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2 space-y-2">
                { SidebarList.map((item, key) => {
                  return <SidebarItem key={`sidebar-${key}`} icon={item.icon} label={item.label} active={item.active}>{item.title}</SidebarItem>
                })}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <div className="hidden fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90" id="sidebarBackdrop"></div>
    </React.Fragment>
  )
}

export default SidebarLayout;