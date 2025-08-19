import React, { useState, useContext } from "react";
import { AuthContext } from "../../features/auth/AuthContext";
import axiosSecure from "../../api/axiosSecure";
import { toast } from "react-hot-toast";

const FeedbackModal = ({ campId, onClose }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    setSubmitting(true);
    try {
      const token = await user.getIdToken();
      await axiosSecure.post(
        "/feedback",
        { campId, rating, feedback: feedbackText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Thank you for your feedback!");
      onClose();
    } catch (err) {
      console.error("Feedback submission error:", err);
      toast.error(
        err.response?.data?.error || "Failed to submit feedback. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-96 max-w-full shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Give Your Feedback
        </h2>

        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Rating
        </label>
        <select
          className="w-full mb-4 p-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Feedback
        </label>
        <textarea
          className="w-full p-2 mb-4 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          rows={4}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Write your feedback here..."
        />

        <div className="flex justify-end gap-3">
          <button
            className="btn btn-outline"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;


