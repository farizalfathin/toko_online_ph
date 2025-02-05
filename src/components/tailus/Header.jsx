import { Link, useLocation } from "react-router-dom";
import Theme from "../diasy/Theme";
import { useAuth } from "../../utils/store/useAuth";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../../utils/store/useCart";

export const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle state
  };

  return (
    <header className="inline">
      <div className="sticky top-0 z-50">
        <nav className="bg-white dark:bg-gray-900 navbar shadow-md shadow-gray-600/5 peer-checked:navbar-active md:relative dark:shadow-none">
          <div className="px-6 md:px-12 w-full">
            <div className="w-full flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0">
              <div className="w-full flex justify-between lg:w-auto">
                <a
                  href="#"
                  aria-label="logo"
                  className="flex space-x-2 items-center">
                  <span className="text-base font-bold text-gray-600 dark:text-white">
                    MinMarket
                  </span>
                </a>
                {/* Hamburger Button */}
                <button
                  onClick={toggleMenu}
                  className="block lg:hidden cursor-pointer text-gray-600 dark:text-white"
                  aria-label="Toggle navigation">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path
                      d="M3 12h18M3 6h18M3 18h18"
                      className="dark:stroke-white"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`${
                  isMenuOpen ? "block" : "hidden"
                } w-full lg:flex flex-wrap justify-end items-center mb-16 space-y-8 p-6 lg:space-y-0 lg:p-0 lg:m-0 lg:w-7/12`}>
                <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
                  <ul className="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                    <li>
                      <Link
                        to="/"
                        className={`${
                          location.pathname === "/" ? "text-yellow-600" : ""
                        } block md:px-4 transition hover:text-yellow-600 dark:hover:text-primaryLight`}>
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className={`${
                          location.pathname === "/about"
                            ? "text-yellow-600"
                            : ""
                        } block md:px-4 transition hover:text-yellow-600 dark:hover:text-primaryLight`}>
                        <span>About</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/product"
                        className={`${
                          location.pathname === "/product"
                            ? "text-yellow-600"
                            : ""
                        } block md:px-4 transition hover:text-yellow-600 dark:hover:text-primaryLight`}>
                        <span>Product</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className={`${
                          location.pathname === "/contact"
                            ? "text-yellow-600"
                            : ""
                        } block md:px-4 transition hover:text-yellow-600 dark:hover:text-primaryLight`}>
                        <span>Contact</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="w-full items-center gap-7 place-items-center space-y-2 border-primary/10 dark:border-gray-500 border-gray-800 flex flex-col  sm:flex-row lg:space-y-0 md:w-max lg:border-l ml-5 max-lg:ml-0">
                  {user ? (
                    <>
                      <Link
                        to={"/profile"}
                        className="relative ml-4  max-lg:ml-0 flex h-9 max-lg:mb-4  items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full  max-md:w-1/5 before:bg-yellow-700 dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                        <span className="relative text-sm font-semibold dark:text-white text-white ">
                          profile
                        </span>
                      </Link>
                      <Link to={"/keranjang"} className="relative">
                        <FaShoppingCart />
                        <span className="absolute -top-2 -right-2 w-3 h-3 flex items-center justify-center p-2 bg-yellow-500 rounded-full text-white text-xs">
                          {cart.length}
                        </span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      to={"/login"}
                      className="relative ml-4  max-lg:ml-0 flex h-9 max-lg:mb-4  items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full  max-md:w-1/5 before:bg-yellow-700 dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                      <span className="relative text-sm font-semibold dark:text-white text-white ">
                        Login
                      </span>
                    </Link>
                  )}
                  <Theme />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
