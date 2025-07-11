import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  TrendingUp,
  ExternalLink 
} from 'lucide-react';

const HomePage = () => {
  const { data: topCamps = [], isLoading } = useQuery({
    queryKey: ['topCamps'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/camps/top');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            <span className="text-lg font-medium">Loading top camps...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Most Registered Camps
            </h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl">
            Discover the most popular camps with highest participation rates
          </p>
        </div>
      </div>

      {/* Camps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topCamps.map((camp, index) => (
          <div 
            key={camp._id} 
            className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img 
                src={camp.image} 
                alt={camp.title} 
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Ranking Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  #{index + 1} Popular
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {camp.title}
              </h3>

              {/* Location & Date */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">{camp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{camp.date}</span>
                </div>
              </div>

              {/* Participant Count */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {camp.participantCount} Registered
                </span>
              </div>

              {/* Action Button */}
              <Link 
                to={`/camp/${camp._id}`} 
                className="group/link flex items-center justify-between w-full p-3 bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary hover:to-primary/90 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <span className="font-medium text-primary group-hover/link:text-white transition-colors">
                  View Details
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {topCamps.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No camps found</h3>
          <p className="text-gray-500">Check back later for exciting camp opportunities!</p>
        </div>
      )}

      {/* View All Camps Button */}
      <div className="flex justify-center mt-12">
        <Link to="/camps" className="group">
          <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-[1.02] font-medium text-lg">
            <span>View All Camps</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;