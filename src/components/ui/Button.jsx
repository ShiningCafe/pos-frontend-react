import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  let className = "text-white bg-blue-700 hover:bg-blue-800"
  if (props.className) className = props.className
  return (
    <button
      type="button"
      onClick={() => props.onClick()}
      className={className + "focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none"}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.node
};

export default Button;
