import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="sticky bottom-0 backdrop-blur-md flex items-center justify-center p-4">
      <ul className="flex flex-wrap w-full justify-evenly">
        <li>
          <NavLink
            to="/terms-and-conditions"
            className={({ isActive }) =>
              `text-lg py-2 relative group transition-all duration-200 ${
                isActive ? "text-green-500" : ""
              }`
            }
          >
            Terms and Conditions
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/privacy-policy"
            className={({ isActive }) =>
              `text-lg py-2 relative group transition-all duration-200 ${
                isActive ? "text-green-500" : ""
              }`
            }
          >
            Privacy Policy
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/refund-policy"
            className={({ isActive }) =>
              `text-lg py-2 relative group transition-all duration-200 ${
                isActive ? "text-green-500" : ""
              }`
            }
          >
            Refund Policy
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
