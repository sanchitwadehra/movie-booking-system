import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  hoverBgColor = "hover:bg-blue-700",
  textColor = "white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-md ${bgColor} ${hoverBgColor} ${textColor} ${className} transition-all duration-200`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;