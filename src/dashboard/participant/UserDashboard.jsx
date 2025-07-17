// src/dashboard/participant/UserDashboard.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  MessageSquare,
  CreditCard,
  User,
  Calendar,
  UserCircle,
} from "lucide-react"; 

const sidebarItems = [
  
  { name: "User Analytics", path: "user-analytics", icon: <UserCircle size={20} /> },
  { name: "Feedback", path: "feedback", icon: <MessageSquare size={20} /> },
  { name: "Payment History", path: "payment-history", icon: <CreditCard size={20} /> },
  { name: "Registered Camps", path: "registered-camps", icon: <Calendar size={20} /> },
  { name: "Profile", path: "profile", icon: <User size={20} /> },
];

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.nav
        initial={{ width: sidebarOpen ? 240 : 70 }}
        animate={{ width: sidebarOpen ? 240 : 70 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white shadow-lg flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <motion.h1
            className="text-xl font-bold text-indigo-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            Medicamp
          </motion.h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-indigo-600 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? "⬅️" : "➡️"}
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto mt-2">
          {sidebarItems.map(({ name, path, icon }) => {
            const active = location.pathname.includes(path);
            return (
              <li key={path}>
                <NavLink
                  to={path}
                  className={`flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 ${
                    active ? "bg-indigo-100 text-indigo-700 font-semibold" : ""
                  }`}
                >
                  <span>{icon}</span>
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        key="label"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;

