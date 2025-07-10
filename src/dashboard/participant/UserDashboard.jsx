import React, { useState } from 'react';
import { 
  User, 
  BarChart3, 
  Calendar, 
  CreditCard, 
  Settings, 
  MapPin, 
  Phone, 
  Mail, 
  Camera,
  DollarSign,
  CheckCircle,
  XCircle,
  MessageSquare,
  Star,
  Trash2,
  Edit,
  TrendingUp,
  Users,
  Award,
  Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const ParticipantDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Mock data for demonstration
  const participantData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    image: '/api/placeholder/150/150',
    totalCamps: 8,
    totalSpent: 2450,
    upcomingCamps: 3
  };

  const registeredCamps = [
    {
      id: 1,
      name: 'Adventure Mountain Trek',
      fees: 299,
      participantName: 'Sarah Johnson',
      paymentStatus: 'paid',
      confirmationStatus: 'confirmed',
      registrationDate: '2024-01-15',
      campDate: '2024-03-20',
      transactionId: 'TXN_001234'
    },
    {
      id: 2,
      name: 'Beach Volleyball Camp',
      fees: 199,
      participantName: 'Sarah Johnson',
      paymentStatus: 'unpaid',
      confirmationStatus: 'pending',
      registrationDate: '2024-02-10',
      campDate: '2024-04-15',
      transactionId: null
    },
    {
      id: 3,
      name: 'Rock Climbing Basics',
      fees: 149,
      participantName: 'Sarah Johnson',
      paymentStatus: 'paid',
      confirmationStatus: 'confirmed',
      registrationDate: '2024-01-20',
      campDate: '2024-02-28',
      transactionId: 'TXN_001235'
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      campName: 'Adventure Mountain Trek',
      fees: 299,
      paymentDate: '2024-01-16',
      paymentStatus: 'completed',
      confirmationStatus: 'confirmed',
      transactionId: 'TXN_001234'
    },
    {
      id: 2,
      campName: 'Rock Climbing Basics',
      fees: 149,
      paymentDate: '2024-01-21',
      paymentStatus: 'completed',
      confirmationStatus: 'confirmed',
      transactionId: 'TXN_001235'
    }
  ];

  const analyticsData = [
    { month: 'Jan', camps: 2, spending: 448 },
    { month: 'Feb', camps: 1, spending: 149 },
    { month: 'Mar', camps: 3, spending: 597 },
    { month: 'Apr', camps: 2, spending: 398 },
    { month: 'May', camps: 0, spending: 0 },
    { month: 'Jun', camps: 1, spending: 199 }
  ];

  const campTypeData = [
    { name: 'Adventure', value: 35, color: '#8B5CF6' },
    { name: 'Sports', value: 25, color: '#06B6D4' },
    { name: 'Nature', value: 20, color: '#10B981' },
    { name: 'Skills', value: 20, color: '#F59E0B' }
  ];

  const handlePayment = (campId) => {
    // Simulate payment processing
    setTimeout(() => {
      alert(`Payment successful for camp ID: ${campId}! Transaction ID: TXN_${Date.now()}`);
      // Update payment status in real app
    }, 1000);
  };

  const handleCancelRegistration = () => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      // Remove from database in real app
      alert('Registration cancelled successfully!');
    }
  };

  const handleFeedback = (camp) => {
    setSelectedCamp(camp);
    setShowFeedbackModal(true);
  };

  const submitFeedback = () => {
    // Save feedback to database
    alert('Thank you for your feedback!');
    setShowFeedbackModal(false);
    setRating(0);
    setFeedback('');
  };

  const sidebarItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'camps', label: 'Registered Camps', icon: Calendar },
    { id: 'payments', label: 'Payment History', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="flex">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Analytics Overview</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>Last 6 months</span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Camps</p>
                      <p className="text-2xl font-bold text-gray-800">{participantData.totalCamps}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Spent</p>
                      <p className="text-2xl font-bold text-gray-800">${participantData.totalSpent}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Upcoming Camps</p>
                      <p className="text-2xl font-bold text-gray-800">{participantData.upcomingCamps}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Camp Registrations</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="camps" fill="url(#colorGradient)" />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Camp Types Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={campTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {campTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Spending Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Spending Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="spending" stroke="#8B5CF6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Profile Management</h1>
                <button
                  onClick={() => setShowUpdateProfile(!showUpdateProfile)}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Update Profile</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="relative">
                    <img
                      src={participantData.image}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                    />
                    <button className="absolute -bottom-2 -right-2 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{participantData.name}</h2>
                    <p className="text-gray-600">Camp Enthusiast</p>
                  </div>
                </div>

                {showUpdateProfile ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={participantData.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={participantData.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue={participantData.phone}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          defaultValue={participantData.address}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
                        Save Changes
                      </button>
                      <button
                        onClick={() => setShowUpdateProfile(false)}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{participantData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{participantData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium">{participantData.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'camps' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Registered Camps</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{registeredCamps.length} camps registered</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left">Camp Name</th>
                        <th className="px-6 py-4 text-left">Fees</th>
                        <th className="px-6 py-4 text-left">Payment Status</th>
                        <th className="px-6 py-4 text-left">Confirmation</th>
                        <th className="px-6 py-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registeredCamps.map((camp, index) => (
                        <tr key={camp.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-800">{camp.name}</p>
                              <p className="text-sm text-gray-600">Date: {camp.campDate}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-green-600">${camp.fees}</p>
                          </td>
                          <td className="px-6 py-4">
                            {camp.paymentStatus === 'paid' ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Paid
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                                <XCircle className="w-4 h-4 mr-1" />
                                Unpaid
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              camp.confirmationStatus === 'confirmed' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {camp.confirmationStatus === 'confirmed' ? (
                                <CheckCircle className="w-4 h-4 mr-1" />
                              ) : (
                                <Clock className="w-4 h-4 mr-1" />
                              )}
                              {camp.confirmationStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              {camp.paymentStatus === 'unpaid' && (
                                <button
                                  onClick={() => handlePayment(camp.id)}
                                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                                >
                                  Pay Now
                                </button>
                              )}
                              {camp.paymentStatus === 'paid' && (
                                <button
                                  onClick={() => handleFeedback(camp)}
                                  className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition-colors flex items-center space-x-1"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>Feedback</span>
                                </button>
                              )}
                              <button
                                onClick={() => handleCancelRegistration(camp.id)}
                                disabled={camp.paymentStatus === 'paid'}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                  camp.paymentStatus === 'paid'
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-red-500 text-white hover:bg-red-600'
                                }`}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Payment History</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span>{paymentHistory.length} completed payments</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left">Camp Name</th>
                        <th className="px-6 py-4 text-left">Amount</th>
                        <th className="px-6 py-4 text-left">Payment Date</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Transaction ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment, index) => (
                        <tr key={payment.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-800">{payment.campName}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-green-600">${payment.fees}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-600">{payment.paymentDate}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Completed
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-600 font-mono text-sm">{payment.transactionId}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Leave Feedback</h3>
            <p className="text-gray-600 mb-4">How was your experience with {selectedCamp?.name}?</p>
            
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Rating:</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Your Feedback:</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows="4"
                placeholder="Tell us about your experience..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={submitFeedback}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Submit Feedback
              </button>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantDashboard;
