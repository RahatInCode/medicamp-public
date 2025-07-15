// ---- src/components/dashboard/RegisteredCamps.jsx ----

import React from 'react';
import { Calendar, CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';

const RegisteredCamps = ({ registeredCamps, onPay, onCancel, onFeedback }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Registered Camps</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{registeredCamps.length} camps registered</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Camp Name</th>
                <th className="px-6 py-4 text-left">Fees</th>
                <th className="px-6 py-4 text-left">Payment Status</th>
                <th className="px-6 py-4 text-left">Confirmation</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registeredCamps.map((camp, index) => (
                <tr key={camp.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-800">{camp.name}</p>
                      <p className="text-sm text-gray-600">Date: {camp.campDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-green-600">${camp.fees}</p>
                  </td>
                  <td className="px-6 py-4">
                    {camp.paymentStatus === 'paid' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                        <XCircle className="w-4 h-4 mr-1" />
                        Unpaid
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      camp.confirmationStatus === 'confirmed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {camp.confirmationStatus === 'confirmed' ? (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <Clock className="w-4 h-4 mr-1" />
                      )}
                      {camp.confirmationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {camp.paymentStatus === 'unpaid' && (
                        <button
                          onClick={() => onPay(camp.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          Pay Now
                        </button>
                      )}
                      {camp.paymentStatus === 'paid' && (
                        <button
                          onClick={() => onFeedback(camp)}
                          className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition-colors flex items-center space-x-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Feedback</span>
                        </button>
                      )}
                      <button
                        onClick={() => onCancel(camp.id)}
                        disabled={camp.paymentStatus === 'paid'}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          camp.paymentStatus === 'paid'
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
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

export default RegisteredCamps;
