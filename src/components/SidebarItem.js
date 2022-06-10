import PropTypes from 'prop-types'
import DynamicHeroIcon from './DynamicHeroIcon'

function SidebarItem (props) {
  return (
    <li>
      <a className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${props.active === 'true' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
          <DynamicHeroIcon icon={props.icon}></DynamicHeroIcon>
          <span className="flex-1 ml-3 whitespace-nowrap" sidebar-toggle-item="true">{props.children}</span>
          {props.label ? (<span className="inline-flex justify-center items-center p-1 ml-3 w-5 h-5 text-sm font-medium rounded-full text-primary-800 bg-primary-100" sidebar-toggle-item="true">{props.label}</span>) : '' }
      </a>
    </li>
  )
}

SidebarItem.propTypes = {
  children: PropTypes.string,
  active: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string
};

export default SidebarItem