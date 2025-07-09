// src/pages/AvailableCamps.jsx
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import { Link } from 'react-router'; // ✅ FIX: router-dom instead of 'react-router'
import {
  Calendar,
  MapPin,
  Stethoscope,
  Users,
  Info,
} from 'lucide-react';

const AvailableCamps = () => {
  const { data: camps = [], isLoading, error } = useQuery({
    queryKey: ['available-camps'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/availableCamps');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading camps...</p>;
  if (error) return <p className="text-center text-red-500">Error loading camps!</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-10 text-center">Available Medical Camps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="overflow-hidden">
              <img
                src={camp.image}
                alt={camp.campName}
                className="w-full h-52 object-cover transform hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-2xl font-bold text-gray-800">{camp.campName}</h3>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(camp.dateTime).toLocaleString()}
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4" />
                {camp.location}
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Stethoscope className="w-4 h-4" />
                {camp.healthcareProfessional}
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Users className="w-4 h-4" />
                {camp.participantCount} participants
              </div>

              <div className="flex items-start gap-2 text-gray-600 text-sm">
                <Info className="w-4 h-4 mt-0.5" />
                <p>{camp.description?.slice(0, 90)}...</p>
              </div>

              <Link
                to={`/camp-details/${camp._id}`}
                className="inline-block w-full mt-4 px-5 py-2 text-center text-white bg-black hover:bg-gray-900 rounded-lg font-medium transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
