// src/pages/AvailableCamps.jsx
import { useEffect, useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const itemsPerPage = 6;

const AvailableCamps = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: camps = [], isLoading, error } = useQuery({
    queryKey: ['available-camps'],
    queryFn: async () => {
      const res = await axios.get('https://medicamp-server-five.vercel.app/camps');
      return res.data;
    },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy]);

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

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) 
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading amazing camps...</p>
        </div>
      </div>
    );
  
  if (error) 
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl text-red-600 font-semibold">Oops! Something went wrong</p>
          <p className="text-gray-500 mt-2">Unable to load camps at the moment</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-black to-purple-600 bg-clip-text text-transparent mb-4">
            Available Medical Camps
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover and join health camps near you. Quality healthcare made accessible for everyone.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search camps, locations, doctors..."
                className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Controls */}
            <div className="flex gap-3 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 bg-white"
              >
                <option value="">Sort By</option>
                <option value="most">Most Registered</option>
                <option value="fees">Camp Fees</option>
                <option value="alphabetical">Alphabetical Order</option>
                <option value="date">Date</option>
              </select>

              <button
                onClick={() => setViewType(viewType === 'grid' ? 'table' : 'grid')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                title="Toggle View"
              >
                {viewType === 'grid' ? <List size={20} /> : <LayoutGrid size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{paginatedCamps.length}</span> of{' '}
            <span className="font-semibold text-blue-600">{filteredCamps.length}</span> camps
          </p>
        </div>

        {/* GRID VIEW */}
        {viewType === 'grid' ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {paginatedCamps.map((camp) => (
              <div
                key={camp._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={camp.image || 'https://via.placeholder.com/400x200.png?text=Camp+Image'}
                    alt={camp.campName}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                    {camp.participantCount} joined
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {camp.campName}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                        <Calendar size={14} className="text-blue-500" />
                      </div>
                      <span>{new Date(camp.dateTime).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                        <MapPin size={14} className="text-green-500" />
                      </div>
                      <span>{camp.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                        <Stethoscope size={14} className="text-purple-500" />
                      </div>
                      <span>{camp.healthcareProfessional}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {camp.description?.slice(0, 120)}...
                  </p>
                  
                  <Link to={`/camp/${camp._id}`} className="block">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                      <Info size={16} />
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // TABLE VIEW
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Camp Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Doctor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Participants</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedCamps.map((camp, index) => (
                    <tr
                      key={camp._id}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-blue-50 transition-colors duration-200`}
                    >
                      <td className="px-6 py-4">
                        <img
                          src={camp.image || 'https://via.placeholder.com/80x60.png?text=Camp'}
                          alt={camp.campName}
                          className="w-16 h-12 object-cover rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{camp.campName}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(camp.dateTime).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-gray-600">{camp.location}</td>
                      <td className="px-6 py-4 text-gray-600">{camp.healthcareProfessional}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {camp.participantCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          to={`/camp/${camp._id}`}
                          className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                        >
                          <Info size={14} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <nav className="flex items-center gap-2 bg-white rounded-2xl shadow-lg p-2 border border-gray-100">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    currentPage === i + 1
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCamps;

