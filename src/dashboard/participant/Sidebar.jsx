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
    <div className="w-64 bg-base-100 shadow-xl min-h-screen transition-colors duration-300">
      <div className="p-6 border-b border-base-300">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-base-content">Dashboard</h2>
            <p className="text-sm text-base-content/70">Welcome back!</p>
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
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 rounded-lg
                ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-base-content hover:text-primary hover:bg-base-200'
                }`}
            >
              <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-base-content'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

