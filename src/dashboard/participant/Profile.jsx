// ---- src/components/dashboard/Profile.jsx ----

import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Mail, Phone, MapPin, Camera, Edit } from 'lucide-react';

const Profile = ({ participantData }) => {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [profileData, setProfileData] = useState(participantData);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setProfileData({
        ...participantData,
        name: user.displayName || participantData.name,
        email: user.email || participantData.email,
        image: user.photoURL || participantData.image
      });
    }
  }, [participantData]);

  return (
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
              src={profileData.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
            />
            <button className="absolute -bottom-2 -right-2 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
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
                  defaultValue={profileData.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={profileData.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue={profileData.phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  defaultValue={profileData.address}
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
                <p className="font-medium">{profileData.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{profileData.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{profileData.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;