import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';


const Home = () => {

  const { data: topCamps = [], isLoading } = useQuery({
  queryKey: ['topCamps'],
  queryFn: async () => {
    const res = await axios.get('http://localhost:3000/camps/top');
    return res.data;
  },
});

  if (isLoading) return <p>Loading top camps...</p>;

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">🔥 Most Registered Camps</h2>
        <Link to="/camps">
          <button className="bg-primary text-white px-5 py-2 rounded-xl hover:bg-opacity-90 transition-all">
            Show All Camps
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topCamps.map((camp) => (
          <div key={camp._id} className="bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform">
            <img src={camp.image} alt={camp.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{camp.title}</h3>
              <p className="text-gray-600 mt-1">{camp.location}</p>
              <p className="text-sm text-gray-500 mt-2">{camp.date}</p>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
                <span>🧑‍🤝‍🧑 {camp.participantCount} Registered</span>
                <Link to={`/camp/${camp._id}`} className="text-primary hover:underline">
  Details →
</Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;