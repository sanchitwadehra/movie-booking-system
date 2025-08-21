import React from "react";

function Logo({ src,width,height }) {
  return (
    <div>
      <img
        src={src} 
        alt="Logo"
        className={`${width} ${height} object-contain`}
      />
    </div>
  );
}

export default Logo;
