import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from "../../features/auth/AuthContext";
import { toast } from 'react-hot-toast';

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [starRating, setStarRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Fetch registered camps of the user
  const {
    data: registeredCamps = [],
    refetch: refetchCamps,
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

  // Fetch feedbacks by current user
  const {
    data: feedbacks = [],
    refetch: refetchFeedbacks,
  } = useQuery({
    queryKey: ['feedbacks', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/feedback?participantEmail=${user.email}`);
      return res.data;
    }
  });

  // Cancel registration
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
        refetchCamps();
      } catch (error) {
        console.error(error);
        toast.error("Failed to cancel.");
      }
    }
  };

  // Handle payment initiation
  const handlePay = async (camp) => {
    try {
      if (!camp.campId) {
        toast.error("Invalid camp ID.");
        return;
      }

      const response = await axiosSecure.get(`/camps/${camp.campId}`);
      if (!response.data?._id) {
        toast.error("This camp no longer exists.");
        return;
      }

      const session = await axiosSecure.post('/payment/create-checkout-session', {
        campId: camp.campId,
      });
      window.location.href = session.data.url;
    } catch (err) {
      console.error("Payment initiation failed:", err.message);
      toast.error("Payment failed or camp no longer available.");
    }
  };

  // Open feedback modal
  const handleFeedback = (camp) => {
    setSelectedCamp(camp);
    setFeedbackText("");
    setStarRating(5);
  };

  // Submit feedback to backend
  const submitFeedback = async () => {
    if (!feedbackText.trim()) {
      toast.error("Please write something.");
      return;
    }
    setSubmitting(true);
    try {
      await axiosSecure.post('/feedback', {
        campId: selectedCamp._id,
        rating: starRating,
        feedback: feedbackText,
      });
      toast.success("🎉 Feedback submitted!");
      setSelectedCamp(null);
      refetchFeedbacks();   // refresh feedback list
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
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
              registeredCamps.map((camp) => {
                const feedbackForCamp = feedbacks.find(fb => fb.campId === camp._id);

                return (
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
                      {camp.paymentStatus === 'Paid' ? (
                        feedbackForCamp ? (
                          <span className="text-yellow-500 font-medium">
                            ⭐ {feedbackForCamp.rating}/5
                          </span>
                        ) : (
                          <button
                            onClick={() => handleFeedback(camp)}
                            className="btn btn-xs btn-outline"
                          >
                            Feedback
                          </button>
                        )
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {selectedCamp && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl relative">
            <h3 className="text-xl font-bold mb-4">
              Leave Feedback for {selectedCamp.campName}
            </h3>

            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="textarea textarea-bordered w-full mb-4"
              rows={4}
              placeholder="What did you like or dislike?"
            />

            <div className="mb-4 flex items-center gap-2">
              <span className="font-semibold">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setStarRating(star)}
                  className={`cursor-pointer text-2xl ${
                    starRating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedCamp(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={submitting}
                onClick={submitFeedback}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredCamps;





