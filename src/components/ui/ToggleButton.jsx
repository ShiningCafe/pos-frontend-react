import React from "react";
import PropTypes from "prop-types";

const ToggleButton = (props) => {
  return (
    <div>
      <button
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        onClick={() => props.onClick()}
      >
        {!props.active ? (
          <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {props.children}
          </span>
        ) : (
          <span className="relative px-4 py-2 transition-all ease-in duration-75 text-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {props.children}
          </span>
        )}
      </button>
    </div>
  );
};

ToggleButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

export default ToggleButton;
