import { NavLink, Outlet } from "react-router";

export default function OrganizerDashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Organizer Dashboard</h2>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `mb-4 px-4 py-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Organizer Profile
        </NavLink>
        <NavLink
          to="add-camp"
          className={({ isActive }) =>
            `mb-4 px-4 py-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Add A Camp
        </NavLink>
        <NavLink
          to="manage-camps"
          className={({ isActive }) =>
            `mb-4 px-4 py-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Manage Camps
        </NavLink>
        <NavLink
          to="manage-registered"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Manage Registered Camps
        </NavLink>
      </nav>

      {/* Main content */}
      <main className="flex-grow p-8 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

