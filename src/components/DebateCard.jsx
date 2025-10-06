import React, { useEffect, useState } from "react";

const DebateCard = ({ debate }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading effect (optional)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p className="text-center">Loading debate...</p>;
  if (!debate) return <p className="text-center">No debate available</p>;

  return (
    <div className="w-full mx-auto bg-white border border-green-400 rounded-lg shadow-sm p-5">
      {/* Debate Question */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{debate.title}</h2>
        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          {debate.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{debate.description}</p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
        <div>
          <span className="font-semibold">Start Time:</span>
          <p>{debate.startTime}</p>
        </div>
        <div>
          <span className="font-semibold">Time Remaining:</span>
          <p>{debate.remaining}</p>
        </div>
      </div>

      {/* Join Debate Button & Participants */}
      <div className="flex items-center justify-between">
        <button className="bg-red-600 text-white px-5 py-2 rounded-md font-medium hover:bg-red-700">
          Join Debate
        </button>

        <div className="flex items-center">
          {/* Avatars */}
          <div className="flex -space-x-2">
            {debate.images.map((avatar, idx) => (
              <img
                key={idx}
                className="w-8 h-8 rounded-full border border-white"
                src={avatar}
                alt={`User ${idx + 1}`}
              />
            ))}
          </div>
          <span className="ml-3 text-sm text-gray-700">
            {debate.participants}+ participants
          </span>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="mt-4">
        <div className="flex justify-between text-xs font-semibold mb-1">
          <span className="text-green-600">{debate.agreePercent}% Agree</span>
          <span className="text-red-600">{debate.differPercent}% Differ</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded flex overflow-hidden">
          <div
            className="bg-green-500 h-2"
            style={{ width: `${debate.agreePercent}%` }}
          ></div>
          <div
            className="bg-red-500 h-2"
            style={{ width: `${debate.differPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DebateCard;
