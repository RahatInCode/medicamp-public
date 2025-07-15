
import React from 'react';
import { 
  User, 
  BarChart3, 
  Calendar, 
  CreditCard 
} from 'lucide-react';

const sidebarItems = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'camps', label: 'Registered Camps', icon: Calendar },
  { id: 'payments', label: 'Payment History', icon: CreditCard }
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-white shadow-xl min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
            <p className="text-sm text-gray-600">Welcome back!</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 hover:bg-gray-50 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
