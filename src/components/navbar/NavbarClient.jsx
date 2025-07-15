"use client"
import { Fragment, useState, useContext } from "react"
import { Menu, Transition } from "@headlessui/react"
import { Link, useNavigate } from "react-router"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/firebase.config"
import { AuthContext } from "../../features/auth/AuthContext";
import { useQuery } from "@tanstack/react-query"
import axios from "../../api/axiosSecure"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"

const NavbarClient = () => {
  const { user } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const { data: userData = {} } = useQuery({
    
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/${user?.email}`)
      console.log("userData:", userData);
      return res.data
    },
    enabled: !!user?.email,
  })

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/")
  }

  const dashboardPath =
    userData?.role === "organizer" ? "/organizer/dashboard" : "/userDashboard"

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

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden block text-gray-700 focus:outline-none"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-black font-medium">
            Home
          </Link>
          <Link to="/camps" className="text-gray-700 hover:text-black font-medium">
            Available Camps
          </Link>

          {!user ? (
            <Link
              to="/auth"
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Join Us
            </Link>
          ) : (
            <Menu as="div" className="relative">
              <Menu.Button className="focus:outline-none group">
                <img
                  src={
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${user?.displayName || "U"}`
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 group-hover:border-black transition"
                  title={user.displayName}
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900">{user?.displayName}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={dashboardPath}
                          className={`block px-4 py-2 text-sm rounded-md ${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
                          className={`block w-full text-left px-4 py-2 text-sm rounded-md ${
                            active ? "bg-red-100 text-red-700" : "text-red-600"
                          }`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 font-medium">
            Home
          </Link>
          <Link to="/camps" className="block text-gray-700 font-medium">
            Available Camps
          </Link>
          {user ? (
            <>
              <Link to={dashboardPath} className="block text-gray-700 font-medium">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="block bg-black text-white px-4 py-2 rounded-full text-center"
            >
              Join Us
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default NavbarClient








