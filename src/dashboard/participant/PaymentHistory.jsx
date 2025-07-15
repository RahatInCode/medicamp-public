// src/components/dashboard/PaymentHistory.jsx

import React from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';

const PaymentHistory = ({ paymentHistory }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Payment History</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CreditCard className="w-4 h-4" />
          <span>{paymentHistory.length} completed payments</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Camp Name</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Payment Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={payment.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{payment.campName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-green-600">${payment.fees}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{payment.paymentDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 font-mono text-sm">{payment.transactionId}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
