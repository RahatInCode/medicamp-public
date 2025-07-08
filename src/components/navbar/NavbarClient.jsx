"use client"
import { Menu } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Link } from "react-router"

const NavbarClient = ({ user, handleLogout }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white text-lg font-semibold">
            M
          </div>
          <span className="text-black">MediCamp</span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-black font-medium">
            Home
          </Link>
          <Link to="/camps" className="text-gray-700 hover:text-black font-medium">
            Available Camps
          </Link>

          {!user ? (
            <Link
              to="/join"
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Join Us
            </Link>
          ) : (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 focus:outline-none">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-gray-800">{user.displayName || "No Name"}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <hr />
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/dashboard"
                      className={`block px-4 py-2 text-sm ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm text-red-600 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavbarClient
