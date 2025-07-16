import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from "../../features/auth/AuthContext";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe('pk_test_51RlMgIHHrlnP3yveglcBg4lDlDZgIHRyDLNRlj28UKPx7ua2jLGjvgvVkKNzAjYzJGw6xSA7zXjXwQi8Ng1T7bZ100ZNdVeqkA');

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext);

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
      const res = await axiosSecure.get(`/participantRegistrations/user?email=${user.email}`);
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
        await axiosSecure.delete(`/participantRegistrations/${id}`);
        toast.success("Registration cancelled successfully.");
        refetch();
      } catch (error) {
        console.error(error);
        toast.error("Failed to cancel.");
      }
    }
  };

  const handlePay = async (camp) => {
    try {
      const stripe = await stripePromise;
      const response = await axiosSecure.post('/api/payments/create-checkout-session', {
        campId: camp._id
      });

      const session = response.data;
      if (!stripe || !session?.id) {
        toast.error("Stripe session failed.");
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error(result.error.message);
        toast.error("Stripe redirection failed.");
      }
    } catch (err) {
      console.error('Payment initiation failed:', err.message);
      toast.error('Payment failed!');
    }
  };

  const FeedbackModal = (camp) => {
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
              registeredCamps.map((camp) => (
                <tr key={camp._id}>
                  <td>{camp.campName || 'Unknown'}</td>
                  <td>{camp.campFees || 0}৳</td>
                  <td>
                    {camp.paymentStatus === 'Paid' ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePay(camp)}
                        className="btn btn-xs btn-primary"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td>
                    <span className="badge badge-outline">
                      {camp.confirmationStatus || 'Pending'}
                    </span>
                  </td>
                  <td>
                    {camp.paymentStatus === 'Paid' ? (
                      <button className="btn btn-xs btn-disabled">Cancel</button>
                    ) : (
                      <button
                        onClick={() => handleCancel(camp._id)}
                        className="btn btn-xs btn-error"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                  <td>
                    {camp.paymentStatus === 'Paid' && !camp.feedbackGiven ? (
                      <button
                        onClick={() => FeedbackModal(camp)}
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



