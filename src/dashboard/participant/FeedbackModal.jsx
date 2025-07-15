// src/components/dashboard/FeedbackModal.jsx

import React from 'react';
import { Star } from 'lucide-react';

const FeedbackModal = ({
  show,
  onClose,
  campName,
  rating,
  setRating,
  feedback,
  setFeedback,
  onSubmit,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4">Leave Feedback</h3>
        <p className="text-gray-600 mb-4">How was your experience with {campName}?</p>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Rating:</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                aria-label={`${star} Star`}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Your Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="4"
            placeholder="Tell us about your experience..."
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onSubmit}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            Submit Feedback
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
