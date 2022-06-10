import PropTypes from 'prop-types'
import * as HIcons from '@heroicons/react/outline'

function DynamicHeroIcon (props) {
  const {...icons} = HIcons
  const TheIcon = icons[props.icon]

  return (
    <>
      <TheIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" />
    </>
  )
}

DynamicHeroIcon.propTypes = {
  icon: PropTypes.string
}

export default DynamicHeroIcon