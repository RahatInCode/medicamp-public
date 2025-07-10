// src/pages/AvailableCamps.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import { Link } from 'react-router';
import {
  Calendar,
  MapPin,
  Stethoscope,
  Users,
  Info,
  List,
  LayoutGrid,
  Search,
} from 'lucide-react';

const AvailableCamps = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [viewType, setViewType] = useState('grid');

  const { data: camps = [], isLoading, error } = useQuery({
    queryKey: ['available-camps'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/availableCamps');
      return res.data;
    },
  });

  const filteredCamps = camps
    ?.filter((camp) =>
      [camp.campName, camp.location, camp.dateTime, camp.healthcareProfessional]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'most') return b.participantCount - a.participantCount;
      if (sortBy === 'fees') return a.fees - b.fees;
      if (sortBy === 'alphabetical') return a.campName.localeCompare(b.campName);
      if (sortBy === 'date') return new Date(a.dateTime) - new Date(b.dateTime);
      return 0;
    });

  if (isLoading) return <p className="text-center py-10 text-lg">Loading camps...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error loading camps!</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Available Medical Camps</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover and join medical camps in your area. Quality healthcare made accessible for everyone.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        {/* Search Input with Icon */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, location, date, or doctor"
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Sort & View Toggle */}
        <div className="flex gap-2 items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Sort By</option>
            <option value="most">Most Registered</option>
            <option value="fees">Camp Fees</option>
            <option value="alphabetical">Alphabetical Order</option>
            <option value="date">Date</option>
          </select>

          <button
            onClick={() => setViewType(viewType === 'grid' ? 'table' : 'grid')}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md transition"
            title="Toggle View"
          >
            {viewType === 'grid' ? <List size={20} /> : <LayoutGrid size={20} />}
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewType === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCamps.map((camp) => (
            <div
              key={camp._id}
              className=" rounded-lg shadow hover:shadow-md transition p-5 bg-white"
            >
              <img
                src={camp.image || 'https://via.placeholder.com/400x200.png?text=Camp+Image'}
                alt={camp.campName}
                className="rounded-md mb-3 w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{camp.campName}</h3>
              <div className="text-gray-600 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> {new Date(camp.dateTime).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> {camp.location}
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope size={16} /> {camp.healthcareProfessional}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} /> {camp.participantCount} participants
                </div>
              </div>
              <p className="mt-3 text-gray-700 text-sm">
                {camp.description?.slice(0, 90)}...
              </p>
    <div className='text-center'>
               <Link to={`/camp/${camp._id}`} className="mt-4 inline-block">
  <button className="flex items-center gap-1 bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 transition text-sm">
    <Info size={16} /> View Details
  </button>
</Link>
    </div>

            </div>
          ))}
        </div>
      ) : (
        // TABLE VIEW (Stylish)
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700 bg-white">
            <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Participants</th>
                <th className="p-3 text-center">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredCamps.map((camp, index) => (
                <tr
                  key={camp._id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
                >
                  <td className="p-3">
                    <img
                      src={camp.image || 'https://via.placeholder.com/80x60.png?text=Camp'}
                      alt={camp.campName}
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium">{camp.campName}</td>
                  <td className="p-3">{new Date(camp.dateTime).toLocaleDateString()}</td>
                  <td className="p-3">{camp.location}</td>
                  <td className="p-3">{camp.healthcareProfessional}</td>
                  <td className="p-3">{camp.participantCount}</td>
                  <td className="p-3 text-center">
                    <Link
  to={`/camp/${camp._id}`}
  className="text-blue-600 hover:underline text-sm"
>
  View
</Link>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AvailableCamps;

