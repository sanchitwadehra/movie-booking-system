import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label className="" htmlFor={id}></label>}
      <input
        type={type}
        className={`px-3 py-2 rounded-md         
        bg-gray-100 dark:bg-gray-700 
        text-black dark:text-white 
        border border-gray-950 dark:border-gray-200
        outline-none 
        focus:bg-gray-50 dark:focus:bg-gray-800
        focus:border-blue-500 dark:focus:border-blue-600
        duration-200 w-full
        ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
