import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axiosSecure from "../../api/axiosSecure";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../features/auth/AuthContext";
import FeedbackModal from "../../dashboard/participant/FeedbackModal";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const campId = searchParams.get("campId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [hasGivenFeedback, setHasGivenFeedback] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId || !campId) {
        toast.error("Missing session or camp ID.");
        navigate("/userDashboard/registered-camps");
        return;
      }

      if (!user) {
        console.log("⏳ Waiting for user to be available...");
        return; // don't call axios until user is set
      }

      const token = await user.getIdToken();
      if (!token) {
        toast.error("⚠️ Token missing.");
        return;
      }

      try {
        const res = await axiosSecure.post(
          "/payment/payment-success",
          { sessionId, campId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          toast.success("✅ Payment confirmed successfully!");
          // Check if user already gave feedback for this camp
          const fbRes = await axiosSecure.get("/feedback", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const given = fbRes.data.some(
            (fb) =>
              fb.campId === campId &&
              fb.participantEmail.toLowerCase() === user.email.toLowerCase()
          );
          setHasGivenFeedback(given);
        } else {
          toast.error("⚠️ Payment confirmation failed.");
        }
      } catch (err) {
        console.error("Payment confirmation error:", err);
        toast.error("⚠️ Server error confirming payment.");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId, campId, user, navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base-content/70 text-lg">🔄 Confirming payment...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl font-bold text-success mb-4">🎉 Payment Successful!</h2>
      <p className="text-base-content/70 text-lg mb-6">
        Your camp registration has been confirmed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {!hasGivenFeedback && (
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="btn btn-primary"
          >
            Give Feedback
          </button>
        )}

        <button
          onClick={() =>
            navigate("/userDashboard/registered-camps", {
              state: { refetch: true },
            })
          }
          className="btn btn-secondary"
        >
          Go to Dashboard
        </button>
      </div>

      {showFeedbackModal && (
        <FeedbackModal campId={campId} onClose={() => setShowFeedbackModal(false)} />
      )}
    </div>
  );
};

export default PaymentSuccess;




