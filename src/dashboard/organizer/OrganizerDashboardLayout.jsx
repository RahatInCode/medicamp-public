// OrganizerDashboardLayout.jsx
import { NavLink, Outlet } from "react-router";
import { User, PlusCircle, LayoutList, ClipboardList } from "lucide-react";

export default function OrganizerDashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-base-200 border-r border-base-300 p-6 flex flex-col shadow-lg">
        <h2 className="text-2xl font-extrabold mb-10 tracking-wide">
          🩺 Organizer Panel
        </h2>

        <SidebarLink
          to="organizer-profile"
          label="Organizer Profile"
          icon={<User size={18} />}
        />
        <SidebarLink to="add-camp" label="Add A Camp" icon={<PlusCircle size={18} />} />
        <SidebarLink to="manage-camps" label="Manage Camps" icon={<LayoutList size={18} />} />
        <SidebarLink
          to="manage-registered"
          label="Registered Camps"
          icon={<ClipboardList size={18} />}
        />
       <SidebarLink to="manage-feedbacks" label="Manage Feedbacks" icon={<ClipboardList size={18} />} />
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-base-100 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

// Custom SidebarLink Component
function SidebarLink({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 mb-4 px-4 py-2 rounded-lg transition-all duration-200
         ${isActive 
           ? "bg-primary text-primary-content font-bold shadow-inner"
           : "hover:bg-primary/20 hover:text-primary-content"}`
      }
    >
      <span>{icon}</span>
      <span className="tracking-wide">{label}</span>
    </NavLink>
  );
}


