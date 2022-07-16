import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import DynamicHeroIcon from './DynamicHeroIcon'

const SidebarItemDropdown = (props) => {
  const location = useLocation()

  const [path, setPath] = useState(null)
  const Navigate = useNavigate()

  useEffect(() => {
    if (path) Navigate(path)
    setPath(null)
  }, [path])

  const [toggle, setToggle] = useState(false)
  let div

  const list = []
  props.child.forEach((el) => {
    list.push(
      <li onClick={() => setPath(el.path)} key={`sidebar_list_${el.title}`}>
        <a
          className={`text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 ${
            location.pathname === el.path ? 'bg-gray-100 dark:bg-gray-700' : ''
          } dark:text-gray-200 dark:hover:bg-gray-700`}
        >
          {el.title}
        </a>
      </li>
    )
  })
  div = (
    <ul
      className={`space-y-2 py-2 ${!toggle ? 'hidden' : ''}`}
      id="dropdown-ecommerce"
    >
      {list}
    </ul>
  )

  function toggleButton() {
    setToggle(!toggle)
  }

  return (
    <li>
      <button
        type="button"
        onClick={toggleButton}
        className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <DynamicHeroIcon icon="DocumentReportIcon"></DynamicHeroIcon>
        <span
          className="flex-1 ml-3 text-left whitespace-nowrap"
          sidebar-toggle-item="true"
        >
          {props.children}
        </span>
        <svg
          sidebar-toggle-item="true"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {div}
    </li>
  )
}

SidebarItemDropdown.propTypes = {
  children: PropTypes.string,
  label: PropTypes.string,
  path: PropTypes.string,
  child: PropTypes.array,
}

export default SidebarItemDropdown
