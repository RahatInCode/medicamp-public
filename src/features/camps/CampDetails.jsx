// src/pages/CampDetails.jsx
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';

import { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Stethoscope,
  Users,
  DollarSign,
  Clock,
  Phone,
  User,
  Mail,
  X,
  UserCheck,
  Star,
  Shield,
  Heart,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';

// Toast Component
const Toast = ({ show, type, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          icon: CheckCircle,
          iconColor: 'text-white'
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          icon: XCircle,
          iconColor: 'text-white'
        };
      default:
        return {
          bg: 'bg-blue-500',
          icon: CheckCircle,
          iconColor: 'text-white'
        };
    }
  };

  const { bg, icon: Icon, iconColor } = getToastStyles();

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-in slide-in-from-top-2 duration-300">
      <div className={`${bg} text-white px-6 py-4 rounded-xl shadow-2xl max-w-md flex items-center gap-3 transform transition-all duration-300 hover:scale-105`}>
        <Icon className={`w-6 h-6 ${iconColor} flex-shrink-0`} />
        <div className="flex-1">
          <p className="font-medium text-white">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const CampDetails = () => {
  const { campId } = useParams();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    phone: '',
    gender: '',
    emergencyContact: '',
  });

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  const loggedInUser = {
    name: 'Ashik Mia', // Replace with real user context
    email: 'ashik@example.com',
  };

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

const { data: camp, isLoading, error } = useQuery({
  queryKey: ['camp-details', campId],
  queryFn: async () => {
    const res = await axiosSecure.get(`/availableCamps/${campId}`);
    return res.data;
  },
  enabled: !!campId,
});

 const registrationMutation = useMutation({
  mutationFn: async (newRegistration) => {
    await axiosSecure.post('/participantRegistrations', newRegistration);
    await axiosSecure.patch(`/availableCamps/increment/${campId}`);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['camp-details', campId]);
    setIsModalOpen(false);
    setFormData({
      age: '',
      phone: '',
      gender: '',
      emergencyContact: '',
    });
    showToast('success', `🎉 Successfully registered for "${camp.campName}"! We'll see you there.`);
  },
  onError: (error) => {
    console.error('Registration failed:', error);
    showToast('error', 'Registration failed. Please try again or contact support.');
  },
});

  if (isLoading) 
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-2xl font-semibold text-gray-700">Loading camp details...</p>
          <p className="text-gray-500 mt-2">Please wait while we fetch the information</p>
        </div>
      </div>
    );

  if (error) 
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-500">Failed to load camp details. Please try again later.</p>
        </div>
      </div>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.age || !formData.phone || !formData.gender || !formData.emergencyContact) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }

    const registration = {
      campId,
      campName: camp.campName,
      campFees: camp.campFees,
      location: camp.location,
      healthcareProfessional: camp.healthcareProfessional,
      participantName: loggedInUser.name,
      participantEmail: loggedInUser.email,
      ...formData,
    };

    registrationMutation.mutate(registration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      {/* Toast Component */}
      <Toast 
        show={toast.show} 
        type={toast.type} 
        message={toast.message} 
        onClose={hideToast} 
      />

      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="relative">
            <img 
              src={camp.image || 'https://via.placeholder.com/1200x400?text=Medical+Camp'} 
              alt={camp.campName} 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{camp.campName}</h1>
              <div className="flex items-center gap-2 text-lg">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>Featured Medical Camp</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                About This Camp
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {camp.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-500" />
                What's Included
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Free Health Checkup',
                  'Professional Consultation',
                  'Basic Medications',
                  'Health Awareness Session',
                  'Blood Pressure Monitoring',
                  'BMI Assessment'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Camp Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Camp Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Registration Fee</p>
                    <p className="text-xl font-bold text-blue-600">{camp.campFees} BDT</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold text-gray-800">{new Date(camp.dateTime).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-800">{camp.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Healthcare Professional</p>
                    <p className="font-semibold text-gray-800">{camp.healthcareProfessional}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Participants</p>
                    <p className="font-semibold text-gray-800">{camp.participantCount} registered</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <UserCheck className="w-5 h-5" />
                Join This Camp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-300 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in fade-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5 text-red-500" />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">Camp Registration</h3>
                <p className="text-gray-600">Fill in your details to join this amazing health camp</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Read-only fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Camp Name</label>
                    <input 
                      type="text" 
                      value={camp.campName} 
                      readOnly 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration Fee</label>
                    <input 
                      type="text" 
                      value={`${camp.campFees} BDT`} 
                      readOnly 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input 
                      type="text" 
                      value={camp.location} 
                      readOnly 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Healthcare Professional</label>
                    <input 
                      type="text" 
                      value={camp.healthcareProfessional} 
                      readOnly 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      value={loggedInUser.name} 
                      readOnly 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={loggedInUser.email} 
                      readOnly 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-gray-600"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                      <input
                        type="number"
                        name="age"
                        placeholder="Enter your age"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                        value={formData.age}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                      <select
                        name="gender"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact *</label>
                      <input
                        type="text"
                        name="emergencyContact"
                        placeholder="Emergency contact number"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-4 px-6 rounded-xl transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={registrationMutation.isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    {registrationMutation.isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Registering...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Complete Registration
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;



