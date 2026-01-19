import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    setToken,
    token,
    navigate,
    setCartItems,
  } = useContext(ShopContext);
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium">
        <Link to="/">
          <img src={assets.logo} className="w-36" alt="" />
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex  items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex  items-center gap-1"
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex  items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex  items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <a
            href="https://e-commerce-mern-admin-lyart.vercel.app/"
            target="_blank"
            className="px-5 py-2 border border-gray-300 rounded-full text-sm text-gray-800 bg-white transition"
          >
            Admin Panel
          </a>
        </ul>

        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          <div className=" group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            {/* Dropdown Menu */}
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className=" relative">
            <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="" />
            <p className=" absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt=""
          />
        </div>

        {/* Sidebar menu for small screen */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer border-b"
            >
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180"
                alt=""
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-3 pl-6 border-b"
              to="/"
            >
              HOME
            </NavLink>

            <NavLink
              onClick={() => setVisible(false)}
              className="py-3 pl-6 border-b"
              to="/collection"
            >
              COLLECTION
            </NavLink>

            <NavLink
              onClick={() => setVisible(false)}
              className="py-3 pl-6 border-b"
              to="/about"
            >
              ABOUT
            </NavLink>

            <NavLink
              onClick={() => setVisible(false)}
              className="py-3 pl-6 border-b"
              to="/contact"
            >
              CONTACT
            </NavLink>

            <a
              onClick={() => setVisible(false)}
              className="py-3 pl-6 border-b"
              href="https://e-commerce-mern-admin-lyart.vercel.app/"
              target="_blank"
            >
              ADMIN PANEL
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
