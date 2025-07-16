// src/components/dashboard/UserAnalytics.jsx
import React from 'react';
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

const UserAnalytics = ({ analyticsData }) => {
  /**
   * Sample analyticsData:
   * [
   *   { name: 'Camps Joined', value: 5 },
   *   { name: 'Participants Referred', value: 12 },
   *   { name: 'Events Attended', value: 3 },
   *   { name: 'Certificates Earned', value: 2 }
   * ]
   */

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">User Performance Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={analyticsData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#6366f1" barSize={45} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserAnalytics;
