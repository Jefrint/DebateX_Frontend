import React, { useState } from "react";

const CommentBox = ({ onClose, debate, onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit?.(comment);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        {/* Debate title */}
        <p className="text-center text-gray-800 font-semibold mb-4">
          {debate?.title || "നിങ്ങളുടെ അഭിപ്രായം പങ്കുവെക്കൂ."}
        </p>

        {/* Comment box */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
          className="w-full h-32 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span>{500 - comment.length}</span>
          <label className="cursor-pointer text-blue-600">
            <input type="file" className="hidden" /> Upload
          </label>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className={`w-full font-semibold py-2 rounded-md mt-4 ${
            comment.trim()
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
