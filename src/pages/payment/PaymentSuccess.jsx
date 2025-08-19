import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../features/auth/AuthContext";
import FeedbackModal from "../../dashboard/participant/FeedbackModal";

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCamp, setSelectedCamp] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Fetch registered camps
  const {
    data: registeredCamps = [],
    refetch: refetchCamps,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["registered-camps", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/participantRegistrations/user?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch feedbacks by user
  const {
    data: feedbacks = [],
    refetch: refetchFeedbacks,
  } = useQuery({
    queryKey: ["feedbacks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/feedback?participantEmail=${user.email}`);
      return res.data;
    },
  });

  // Refetch after payment success
  useEffect(() => {
    if (location.state?.refetch) {
      refetchCamps();
      refetchFeedbacks();
      navigate(location.pathname, { replace: true }); // clear state
    }
  }, [location.state, location.pathname, refetchCamps, refetchFeedbacks, navigate]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will cancel your registration!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/participantRegistrations/${id}`);
        toast.success("Registration cancelled successfully.");
        refetchCamps();
      } catch (err) {
        console.error(err);
        toast.error("Failed to cancel.");
      }
    }
  };

  const handlePay = async (camp) => {
    try {
      const response = await axiosSecure.post("/payment/create-checkout-session", {
        campId: camp.campId || camp._id,
      });
      window.location.href = response.data.url;
    } catch (err) {
      console.error("Payment initiation failed:", err);
      toast.error("Payment failed or camp unavailable.");
    }
  };

  const handleFeedback = (camp) => {
    setSelectedCamp(camp);
    setShowFeedbackModal(true);
  };

  if (isLoading) return <p className="text-center p-10">Loading camps...</p>;
  if (isError) return <p className="text-center p-10 text-red-500">{error.message}</p>;

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
                // Check if user gave feedback
                const feedbackForCamp = feedbacks.find(
                  (fb) =>
                    fb.campId.toString() === camp._id.toString() &&
                    fb.participantEmail.toLowerCase() === user.email.toLowerCase()
                );

                return (
                  <tr key={camp._id}>
                    <td>{camp.campName || "Unknown"}</td>
                    <td>{camp.campFees || 0}৳</td>
                    <td>
                      {camp.paymentStatus === "Paid" ? (
                        <span className="text-green-600 font-semibold">Paid</span>
                      ) : (
                        <button
                          className="btn btn-xs btn-primary"
                          onClick={() => handlePay(camp)}
                        >
                          Pay
                        </button>
                      )}
                    </td>
                    <td>
                      <span className="badge badge-outline">
                        {camp.confirmationStatus || "Pending"}
                      </span>
                    </td>
                    <td>
                      {camp.paymentStatus === "Paid" ? (
                        <button className="btn btn-xs btn-disabled">Cancel</button>
                      ) : (
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => handleCancel(camp._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                    <td>
                      {camp.paymentStatus === "Paid" ? (
                        feedbackForCamp ? (
                          <span className="text-yellow-500 font-medium">
                            ⭐ {feedbackForCamp.rating}/5
                          </span>
                        ) : (
                          <button
                            className="btn btn-xs btn-outline"
                            onClick={() => handleFeedback(camp)}
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

      {showFeedbackModal && selectedCamp && (
        <FeedbackModal
          campId={selectedCamp._id}
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
    </div>
  );
};

export default RegisteredCamps;





