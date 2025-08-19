"use client"
import { Fragment, useState, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "../../features/auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import ThemeToggle from "../theme/ThemeToggle";

const NavbarClient = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { data: userData = {} } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const dashboardPath =
    userData?.role === "organizer" ? "/organizer/dashboard" : "/userDashboard";

  return (
    <nav className="bg-base-100 dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white text-lg font-semibold">
            M
          </div>
          <span className="text-base-content dark:text-white">MediCamp</span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden block text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            to="/"
            className="text-base-content dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/camps"
            className="text-base-content dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition"
          >
            Available Camps
          </Link>

          {!user ? (
            <Link
              to="/auth"
              className="btn btn-primary px-4 py-2 rounded-full"
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
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 group-hover:border-primary transition"
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
                <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right bg-base-100 dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-4 py-3">
                    <p className="text-sm font-semibold text-base-content dark:text-white">
                      {user?.displayName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={dashboardPath}
                          className={`block px-4 py-2 text-sm rounded-md ${
                           active
  ? "bg-gray-600 dark:bg-gray-500 text-black dark:text-white"
  : "text-gray-600 dark:text-gray-300"

                          } transition`}
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
                            active
                              ? "bg-red-100 dark:bg-red-700"
                              : "text-red-600 dark:text-red-400"
                          } transition`}
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

        <ThemeToggle />
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 bg-base-100 dark:bg-gray-900 rounded-b-lg transition-colors">
          <Link
            to="/"
            className="block text-base-content dark:text-gray-300 font-medium hover:text-primary dark:hover:text-primary transition"
          >
            Home
          </Link>
          <Link
            to="/camps"
            className="block text-base-content dark:text-gray-300 font-medium hover:text-primary dark:hover:text-primary transition"
          >
            Available Camps
          </Link>

          {user ? (
            <>
              <Link
                to={dashboardPath}
                className="block text-base-content dark:text-gray-300 font-medium hover:text-primary dark:hover:text-primary transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block text-red-600 dark:text-red-400 font-medium hover:underline transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="block btn btn-primary w-full text-center"
            >
              Join Us
            </Link>
          )}
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default NavbarClient;










