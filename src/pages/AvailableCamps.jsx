// src/pages/AvailableCamps.jsx
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import { Link } from 'react-router';
import {
  Calendar,
  MapPin,
  Stethoscope,
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-base-content/70">Loading amazing camps...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-base-100 rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-error" />
          </div>
          <p className="text-xl font-semibold text-error">Oops! Something went wrong</p>
          <p className="text-base-content/70 mt-2">Unable to load camps at the moment</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-base-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
            Available Medical Camps
          </h1>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Discover and join health camps near you. Quality healthcare made accessible for everyone.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 mb-8 border border-base-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" size={20} />
              <input
                type="text"
                placeholder="Search camps, locations, doctors..."
                className="w-full border-2 border-base-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200 bg-base-100 text-base-content"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Controls */}
            <div className="flex gap-3 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-base-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200 bg-base-100 text-base-content"
              >
                <option value="">Sort By</option>
                <option value="most">Most Registered</option>
                <option value="fees">Camp Fees</option>
                <option value="alphabetical">Alphabetical Order</option>
                <option value="date">Date</option>
              </select>

              <button
                onClick={() => setViewType(viewType === 'grid' ? 'table' : 'grid')}
                className="btn btn-primary p-3"
                title="Toggle View"
              >
                {viewType === 'grid' ? <List size={20} /> : <LayoutGrid size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-base-content/70">
            Showing <span className="font-semibold text-primary">{paginatedCamps.length}</span> of{' '}
            <span className="font-semibold text-primary">{filteredCamps.length}</span> camps
          </p>
        </div>

        {/* GRID VIEW */}
        {viewType === 'grid' ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {paginatedCamps.map((camp) => (
              <div
                key={camp._id}
                className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-base-300 group transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={camp.image || 'https://via.placeholder.com/400x200.png?text=Camp+Image'}
                    alt={camp.campName}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-base-200/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-base-content">
                    {camp.participantCount} joined
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-base-content group-hover:text-primary transition-colors">
                    {camp.campName}
                  </h3>

                  <div className="space-y-2 text-sm text-base-content/70 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar size={14} className="text-primary" />
                      </div>
                      <span>{new Date(camp.dateTime).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <MapPin size={14} className="text-secondary" />
                      </div>
                      <span>{camp.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <Stethoscope size={14} className="text-accent" />
                      </div>
                      <span>{camp.healthcareProfessional}</span>
                    </div>
                  </div>

                  <p className="text-base-content/70 text-sm mb-6 line-clamp-3">
                    {camp.description?.slice(0, 120)}...
                  </p>

                  <Link to={`/camp/${camp._id}`} className="block">
                    <button className="btn btn-primary w-full flex items-center justify-center gap-2">
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
          <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-base-300 mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-primary text-primary-content">
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
                <tbody className="divide-y divide-base-300">
                  {paginatedCamps.map((camp, index) => (
                    <tr
                      key={camp._id}
                      className={`${index % 2 === 0 ? 'bg-base-100' : 'bg-base-200'} hover:bg-primary/10 transition-colors duration-200`}
                    >
                      <td className="px-6 py-4">
                        <img
                          src={camp.image || 'https://via.placeholder.com/80x60.png?text=Camp'}
                          alt={camp.campName}
                          className="w-16 h-12 object-cover rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-base-content">{camp.campName}</td>
                      <td className="px-6 py-4 text-base-content/70">{new Date(camp.dateTime).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-base-content/70">{camp.location}</td>
                      <td className="px-6 py-4 text-base-content/70">{camp.healthcareProfessional}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
                          {camp.participantCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          to={`/camp/${camp._id}`}
                          className="btn btn-primary btn-sm inline-flex items-center gap-1"
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
            <nav className="flex items-center gap-2 bg-base-100 rounded-2xl shadow-lg p-2 border border-base-300">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  currentPage === 1
                    ? 'text-base-content/40 cursor-not-allowed'
                    : 'text-base-content hover:bg-primary/10 hover:text-primary'
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
                      ? 'bg-primary text-primary-content shadow-lg'
                      : 'text-base-content hover:bg-primary/10 hover:text-primary'
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
                    ? 'text-base-content/40 cursor-not-allowed'
                    : 'text-base-content hover:bg-primary/10 hover:text-primary'
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


