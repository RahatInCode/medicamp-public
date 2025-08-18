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
    <div className="flex h-screen bg-base-200 transition-colors duration-300">
      {/* Sidebar */}
      <motion.nav
        initial={{ width: sidebarOpen ? 240 : 70 }}
        animate={{ width: sidebarOpen ? 240 : 70 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-base-100 shadow-lg flex flex-col transition-colors duration-300"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-base-300">
          <motion.h1
            className="text-xl font-bold text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            MediCamp
          </motion.h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-primary focus:outline-none"
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
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-primary/20 hover:text-primary ${
                    active ? "bg-primary/20 text-primary font-semibold" : "text-base-content"
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
      <main className="flex-1 p-6 overflow-auto bg-base-200 transition-colors duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;


