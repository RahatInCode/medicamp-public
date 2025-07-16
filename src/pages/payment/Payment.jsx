import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "../../api/axiosSecure";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { id } = useParams(); // registered camp ID
  const [clientSecret, setClientSecret] = useState(null);
  const [camp, setCamp] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(`/registered-camps/${id}`);
      setCamp(res.data);

      const paymentIntent = await axios.post("/payments/create-payment-intent", {
        amount: res.data.campFees,
      });

      setClientSecret(paymentIntent.data.clientSecret);
    };

    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) return toast.error(error.message);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) return toast.error(confirmError.message);

    if (paymentIntent.status === "succeeded") {
      await axios.patch(`/payments/payment-success/${id}`, {
        transactionId: paymentIntent.id,
      });

      toast.success("Payment successful!");
      navigate("/dashboard/participant/registered-camps");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Pay for {camp?.campName}</h2>
      <form onSubmit={handleSubmit}>
        <CardElement className="border p-2 rounded" />
        <button
          className="btn btn-primary mt-4 w-full"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay {camp?.campFees}৳
        </button>
      </form>
    </div>
  );
};

export default Payment;
