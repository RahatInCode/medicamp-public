import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../features/auth/AuthContext';
import { useContext } from 'react';
import axiosSecure from '../../api/axiosSecure';

const UserAnalytics = () => {
  const { user } = useContext(AuthContext);

  const { data: registeredCamps = [], isLoading } = useQuery({
    queryKey: ['registeredCamps', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/participantRegistrations/user?email=${user.email}`);

      return res.data;
    }
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading analytics...</p>;

  if (!Array.isArray(registeredCamps)) {
    return <p className="text-center text-red-500">Invalid data format passed!</p>;
  }

  const totalCamps = registeredCamps.length;
  const campsPaid = registeredCamps.filter(c => c.paymentStatus === 'Paid').length;
  const campsCancelled = registeredCamps.filter(c => c.cancelled === true).length;
  const campsConfirmed = registeredCamps.filter(c => c.confirmationStatus === 'Confirmed').length;
  const successRate = totalCamps ? Math.round((campsConfirmed / totalCamps) * 100) : 0;

  const analyticsData = [
    { name: 'Camps Joined', value: totalCamps },
    { name: 'Camps Paid', value: campsPaid },
    { name: 'Camps Cancelled', value: campsCancelled },
    { name: 'Camps Confirmed', value: campsConfirmed },
    { name: 'Success Rate (%)', value: successRate },
  ];

  if (totalCamps === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500"
      >
        No camp data found. Register for some camps to see your analytics!
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 tracking-wide drop-shadow-md">
        Your Camp Performance 📊
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={analyticsData}
          margin={{ top: 20, right: 40, left: 20, bottom: 10 }}
          barCategoryGap="20%"
        >
          <defs>
            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#A5B4FC" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fill: '#4338ca', fontWeight: '600' }}
            axisLine={{ stroke: '#c7d2fe' }}
            tickLine={false}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={70}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 14, fill: '#4338ca', fontWeight: '600' }}
            axisLine={{ stroke: '#c7d2fe' }}
            tickLine={false}
            width={60}
          />
          <Tooltip
            cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
            contentStyle={{ borderRadius: 8, borderColor: '#6366f1' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar
            dataKey="value"
            fill="url(#colorPrimary)"
            barSize={50}
            radius={[12, 12, 0, 0]}
            isAnimationActive={true}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-8 flex justify-around text-indigo-700 font-semibold">
        <div className="flex flex-col items-center">
          <span className="text-4xl">{totalCamps}</span>
          <span className="text-sm mt-1">Total Camps Joined</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl">{campsPaid}</span>
          <span className="text-sm mt-1">Paid Camps</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl">{campsCancelled}</span>
          <span className="text-sm mt-1">Cancelled</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl">{successRate}%</span>
          <span className="text-sm mt-1">Success Rate</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserAnalytics;




