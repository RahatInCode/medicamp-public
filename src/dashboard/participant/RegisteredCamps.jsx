import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from "../../features/auth/AuthContext";// updated import path
import { toast } from 'react-hot-toast';

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext) 

  const {
    data: registeredCamps = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['registered-camps', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/api/payments/registered-camps?email=${user.email}`);
      return res.data;
    }
  });

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will cancel your registration!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/registered-camps/${id}`);
        toast.success("Registration cancelled successfully.");
        refetch();
      } catch (error) {
        console.error(error);
        toast.error("Failed to cancel.");
      }
    }
  };

  const handlePay = (camp) => {
    console.log(camp);
    toast("Payment logic will be added in Step 2 💳");
  };

  const openFeedbackModal = (camp) => {
    console.log(camp);
    toast("Feedback modal will be added in Step 3 ⭐");
  };

  if (isLoading) return <p className="text-center p-10">Loading camps...</p>;

  if (isError) return (
    <p className="text-center p-10 text-red-500">
      Error loading camps: {error.message}
    </p>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Registered Camps</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Payment</th>
              <th>Confirmation</th>
              <th>Cancel</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {registeredCamps.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-5">
                  You haven’t registered for any camps yet.
                </td>
              </tr>
            ) : (
              registeredCamps.map(({ _id, campName, campFees, paymentStatus, confirmationStatus, feedbackGiven }) => (
                <tr key={_id}>
                  <td>{campName}</td>
                  <td>{campFees}৳</td>
                  <td>
                    {paymentStatus === 'Paid' ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePay({ _id, campName, campFees })}
                        className="btn btn-xs btn-primary"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td>
                    <span className="badge badge-outline">
                      {confirmationStatus}
                    </span>
                  </td>
                  <td>
                    {paymentStatus === 'Paid' ? (
                      <button className="btn btn-xs btn-disabled">Cancel</button>
                    ) : (
                      <button
                        onClick={() => handleCancel(_id)}
                        className="btn btn-xs btn-error"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                  <td>
                    {paymentStatus === 'Paid' && !feedbackGiven ? (
                      <button
                        onClick={() => openFeedbackModal({ _id, campName })}
                        className="btn btn-xs btn-outline"
                      >
                        Feedback
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCamps;

