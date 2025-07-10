// src/pages/CampDetails.jsx
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
import { useState } from 'react';

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

  const loggedInUser = {
    name: 'Ashik Mia', // Replace with real user context
    email: 'ashik@example.com',
  };

  const { data: camp, isLoading, error } = useQuery({
    queryKey: ['camp-details', campId],
    queryFn: async () => {
      const res = await axios.get(`/availableCamps/${campId}`);
      return res.data;
    },
    enabled: !!campId,
  });

  const registrationMutation = useMutation({
    mutationFn: async (newRegistration) => {
      await axios.post('/participantRegistrations', newRegistration);
      await axios.patch(`/availableCamps/increment/${campId}`);
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
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading camp details...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load camp data.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="max-w-3xl mx-auto p-6">
      <img src={camp.image} alt={camp.campName} className="w-full rounded mb-4" />
      <h2 className="text-3xl font-bold">{camp.campName}</h2>
      <p className="text-gray-600 my-2">{camp.description}</p>

      <div className="space-y-2 text-gray-700 mt-4">
        <p><strong>Fees:</strong> {camp.campFees} BDT</p>
        <p><strong>Date & Time:</strong> {new Date(camp.dateTime).toLocaleString()}</p>
        <p><strong>Location:</strong> {camp.location}</p>
        <p><strong>Doctor:</strong> {camp.healthcareProfessional}</p>
        <p><strong>Participants:</strong> {camp.participantCount}</p>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
      >
        Join Camp
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-red-500 font-bold text-xl"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-4">Camp Registration</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Read-only fields */}
              <input type="text" value={camp.campName} readOnly className="input" />
              <input type="text" value={camp.campFees} readOnly className="input" />
              <input type="text" value={camp.location} readOnly className="input" />
              <input type="text" value={camp.healthcareProfessional} readOnly className="input" />
              <input type="text" value={loggedInUser.name} readOnly className="input" />
              <input type="email" value={loggedInUser.email} readOnly className="input" />

              {/* Editable fields */}
              <input
                type="number"
                name="age"
                placeholder="Your Age"
                className="input"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <select
                name="gender"
                className="input"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                type="text"
                name="emergencyContact"
                placeholder="Emergency Contact"
                className="input"
                value={formData.emergencyContact}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                disabled={registrationMutation.isLoading}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                {registrationMutation.isLoading ? 'Registering...' : 'Submit Registration'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;



