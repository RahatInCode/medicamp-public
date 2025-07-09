"use client"
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Link } from "react-router"

const NavbarClient = () => {
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
          <Link to="/" className="text-gray-700 hover:text-black font-medium">
            Home
          </Link>
          <Link to="/camps" className="text-gray-700 hover:text-black font-medium">
            Available Camps
          </Link>
          <Link
            to="/register"
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavbarClient




