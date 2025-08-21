import React from "react";

function container({ children }) {
  return <main className="w-full max-w-7xl mx-auto px-4 flex flex-1 overflow-y-auto justify-center items-center flex-wrap">{children}</main>;
}

export default container;

// flex-grow:
// - Only controls growth factor
// - Value determines how much item grows relative to siblings
// - Doesn't affect shrinking/basis

// flex-1:
// - Shorthand for `flex: 1 1 0%`
// - Equivalent to `flex-grow: 1, flex-shrink: 1, flex-basis: 0%`
// - More comprehensive control of flexbox behavior

// Key benefits of using flex-1:

// Ensures container takes up available space
// Maintains consistent sizing behavior
// Better handles both growing and shrinking
// Sets proper initial size with flex-basis: 0%