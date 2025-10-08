import React from "react";

const CommentBox = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-grey bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        {/* Title */}
        <p className="text-center text-gray-800 font-semibold mb-4">
          നിങ്ങളുടെ അഭിപ്രായം പങ്കുവെക്കൂ.
        </p>

        {/* Comment box */}
        <textarea
          placeholder="Type your comment here..."
          className="w-full h-32 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span>500</span>
          <label className="cursor-pointer text-blue-600">
            <input type="file" className="hidden" /> Upload
          </label>
        </div>

        {/* Submit button */}
        <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md mt-4 hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
