// src/layouts/OrganizerLayout.jsx
import { Outlet } from "react-router-dom";

const OrganizerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white p-4 text-xl font-bold text-center">
        Organizer Dashboard
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizerLayout;
