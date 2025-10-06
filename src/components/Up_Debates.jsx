import React from "react";

const UpcomingDebateCard = ({ debate }) => {
  return (
    <div className=" bg-white shadow-lg rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {debate.title}
      </h2>

      {/* Category */}
      <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-600 font-medium mb-4">
        {debate.category}
      </span>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {debate.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between text-sm text-gray-700 border-t pt-4">
        <div>
          <p className="font-medium">Date & Time</p>
          <p className="text-gray-500">{debate.dateTime}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">Countdown</p>
          <p className="text-gray-500">{debate.countdown}</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDebateCard;
