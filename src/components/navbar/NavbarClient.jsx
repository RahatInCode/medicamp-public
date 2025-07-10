"use client"
import { Fragment, useEffect, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { Link, useNavigate } from "react-router"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../firebase/firebase.config"

const NavbarClient = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
    navigate("/")
  }

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

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-black font-medium">Home</Link>
          <Link to="/camps" className="text-gray-700 hover:text-black font-medium">Available Camps</Link>

          {!user ? (
            <Link
              to="/register"
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Join Us
            </Link>
          ) : (
            <Menu as="div" className="relative">
              <Menu.Button className="focus:outline-none group">
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "U"}`}
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
                    <p className="text-sm  font-semibold text-gray-900">{user?.displayName}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/UserDashboard"
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
    </nav>
  )
}

export default NavbarClient






