import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Logo, LogoutBtn } from "../../components";
import { NavLink } from "react-router";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // to track menu visibility
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMenuOpen(false);
  };

  const profileRef = useRef(null);
  const menuRef = useRef(null); // Reference to the menu
  const hamburgerRef = useRef(null); // Reference to the button to avoid closing the menu when clicking it
  const lightMobileAvatarRef = useRef(null);
  const darkMobileAvatarRef = useRef(null);
  const lightXlAvatarRef = useRef(null);
  const darkXlAvatarRef = useRef(null);
  //TWO DIFFERENT REFS NEEDED AS ON CODE RENDER BOTH MOBILE AND XL AVATAR BUTTONS ARE RENDERED

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      let menuShouldClose = false;
      let profileShouldClose = false;

      // Check for menu
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        menuShouldClose = true;
      }

      // Check for profile
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        !lightMobileAvatarRef.current?.contains(event.target) &&
        !darkMobileAvatarRef.current?.contains(event.target) &&
        !lightXlAvatarRef.current?.contains(event.target) &&
        !darkXlAvatarRef.current?.contains(event.target)
      ) {
        profileShouldClose = true;
      }

      // Update states together to avoid multiple renders
      if (menuShouldClose || profileShouldClose) {
        setIsMenuOpen((prev) => (menuShouldClose ? false : prev));
        setIsProfileOpen((prev) => (profileShouldClose ? false : prev));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to close the menu when a link is clicked
  const closeMenuOnLinkClick = () => {
    setIsMenuOpen(false);
  };

  const closeProfileOnLinkClick = () => {
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 flex w-full p-4 flex-wrap backdrop-blur-md z-1">
      {/* removed relative class from here if facing some error try removing sticky and replacing it with relative */}
      <nav className="flex w-full">
        <ul className="flex w-full justify-between">
          <li className="">
            <NavLink to="/" className="flex items-center text-2xl font-bold">
              <Logo src="/Logo Transparent.png" width="w-14" height="h-auto" />
              {/* <span>MBS</span> */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
          {/*Expanded Navbar*/}
          <li className="hidden xl:flex">
            <ul className="flex flex-row space-x-4 items-center">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-lg py-2 relative group transition-all duration-200 ${
                      isActive ? "text-green-500" : ""
                    }`
                  }
                  onClick={closeMenuOnLinkClick}
                >
                  Movies
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
              <li>
                {/*Profile Avatar Button for xl: */}
                <button
                  ref={lightXlAvatarRef} // Attach ref to the button
                  className={`flex dark:hidden transition-all duration-300 ${
                    isProfileOpen
                      ? "ring-2 ring-primary ring-offset-2 rounded-full"
                      : ""
                  }`}
                  onClick={toggleProfile} // Toggle menu on click
                >
                  <Logo
                    src="/White Theme Avatar Transparent.png"
                    width="w-10"
                    height="h-auto"
                  />
                </button>
                <button
                  ref={darkXlAvatarRef} // Attach ref to the button
                  className={`hidden dark:flex transition-all duration-300 ${
                    isProfileOpen
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-dark rounded-full"
                      : ""
                  }`}
                  onClick={toggleProfile} // Toggle menu on click
                >
                  <Logo
                    src="/Dark Theme Avatar Transparent.png"
                    width="w-10"
                    height="h-auto"
                  />
                </button>
              </li>
            </ul>
          </li>
          {/*xl:hidden buttons*/}
          <li className="flex items-center xl:hidden">
            <ul className="flex items-center justify-center">
              {/*Avatar Button*/}
              <li className="flex items-center justify-center">
                {/*Profile Avatar Button for normal according to Mobile First Design */}
                <button
                  ref={lightMobileAvatarRef} // Attach ref to the button
                  className={`flex dark:hidden transition-all duration-300 ${
                    isProfileOpen
                      ? "ring-2 ring-primary ring-offset-2 rounded-full"
                      : ""
                  }`}
                  onClick={toggleProfile} // Toggle menu on click
                >
                  <Logo
                    src="/White Theme Avatar Transparent.png"
                    width="w-9"
                    height="h-auto"
                  />
                </button>
                <button
                  ref={darkMobileAvatarRef} // Attach ref to the button
                  className={`hidden dark:flex transition-all duration-300 ${
                    isProfileOpen
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-dark rounded-full"
                      : ""
                  }`}
                  onClick={toggleProfile} // Toggle menu on click
                >
                  <Logo
                    src="/Dark Theme Avatar Transparent.png"
                    width="w-9"
                    height="h-auto"
                  />
                </button>
              </li>
              {/*Hamburger Button*/}
              <li>
                <button
                  ref={hamburgerRef} // Attach ref to the button
                  className="relative group"
                  onClick={toggleMenu} // Toggle menu on click
                >
                  {/* Hamburger Icon  Ring classes :- ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30*/}
                  <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all duration-200">
                    <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                      {/* Hamburger Bars */}
                      <div
                        className={`h-[2px] w-7 transform transition-all duration-300 origin-left ${
                          isMenuOpen ? "translate-y-6" : ""
                        } bg-black dark:bg-white`}
                      ></div>
                      <div
                        className={`h-[2px] w-7 rounded transform transition-all duration-300 ${
                          isMenuOpen ? "translate-y-6" : ""
                        } bg-black dark:bg-white`}
                      ></div>
                      <div
                        className={`h-[2px] w-7 transform transition-all duration-300 origin-left ${
                          isMenuOpen ? "translate-y-6" : ""
                        } bg-black dark:bg-white`}
                      ></div>

                      {/* Cross (appears when menu is open) */}
                      <div
                        className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 ${
                          isMenuOpen ? "translate-x-0" : ""
                        } flex w-0 ${isMenuOpen ? "w-12" : ""}`}
                      >
                        <div
                          className={`absolute h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 ${
                            isMenuOpen ? "rotate-45" : ""
                          } bg-black dark:bg-white`}
                        ></div>
                        <div
                          className={`absolute h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 ${
                            isMenuOpen ? "-rotate-45" : ""
                          } bg-black dark:bg-white`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Dropdown Menu (appears when hamburger is clicked) */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="xl:hidden relative top-full left-0 right-0 rounded-b-md backdrop-blur-md w-full"
        >
          <ul className="flex flex-col items-center p-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-lg py-2 relative group transition-all duration-200 ${
                    isActive ? "text-green-500" : ""
                  }`
                }
                onClick={closeMenuOnLinkClick}
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* Dropdown Menu (appears when profile is clicked) */}
      {isProfileOpen && (
        <div
          ref={profileRef}
          className="relative top-full left-0 right-0 rounded-b-md xl:rounded-tl-md backdrop-blur-md w-full xl:w-1/4 xl:left-3/4 xl:right-0"
        >
          <ul className="flex flex-col items-center p-4 w-full">
            {!authStatus && (
              <li className="w-full">
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    `text-lg py-2 relative group flex justify-center items-center w-full transition-all duration-200 hover:bg-gray-200 hover:dark:bg-gray-800 ${
                      isActive ? "text-green-500" : ""
                    }`
                  }
                  onClick={closeProfileOnLinkClick}
                >
                  Login/Sign up
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
            )}
            {authStatus && (
              <>
                <li className="w-full">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-lg py-2 relative group flex justify-center items-center w-full transition-all duration-200 hover:bg-gray-200 hover:dark:bg-gray-800 ${
                        isActive ? "text-green-500" : ""
                      }`
                    }
                    onClick={closeProfileOnLinkClick}
                  >
                    Bookings
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </li>
                <li className="w-full">
                  <LogoutBtn closeMenu={closeProfileOnLinkClick} />
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
