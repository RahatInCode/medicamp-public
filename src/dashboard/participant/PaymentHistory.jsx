import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';
import { AuthContext } from '../../features/auth/AuthContext';
import moment from 'moment';

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const limit = 5; // Number of items per page

  const { data, isLoading, isError } = useQuery({
    queryKey: ['payment-history', user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/history?page=${page}&limit=${limit}`);
      return res.data; // { payments: [], total: number }
    }
  });

  const payments = data?.payments || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  if (isLoading) return <p className="p-10 text-center">Loading payment history...</p>;
  if (isError) return <p className="text-red-500 p-10 text-center">Error loading payment history.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📜 Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>Camp Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-400">No payments found.</td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p._id}>
                  <td>{p.participantRegistrationId?.campId?.campName || "N/A"}</td>
                  <td>{p.participantRegistrationId?.campFees || 0}৳</td>
                  <td>{moment(p.timestamp).format("MMMM D, YYYY • h:mm A")}</td>
                  <td className="text-xs">{p.transactionId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            disabled={page === 1}
          >
            ← Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                page === index + 1 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;


