// src/pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axiosSecure from "../../api/axiosSecure";
import { toast } from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const campId = searchParams.get("campId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId || !campId) {
        toast.error("Missing session or camp ID.");
        navigate("/dashboard/participant/registered-camps");
        return;
      }

      try {
        const res = await axiosSecure.post("/api/payment/payment-success", {
          sessionId,
          campId,
        });

        if (res.data.success) {
          toast.success("✅ Payment confirmed successfully!");
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
  }, [sessionId, campId, navigate]);

  if (loading) return <p className="text-center mt-10">🔄 Confirming payment...</p>;

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold text-green-600">🎉 Payment Successful!</h2>
      <p className="mt-4">Your camp registration has been confirmed.</p>
      <button
        onClick={() => navigate("/dashboard/participant/registered-camps")}
        className="btn btn-primary mt-6"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
