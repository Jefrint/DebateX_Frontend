import React, { useEffect, useState } from "react";

const ActiveDebateHeader = () => {
  // Later this can come from backend API
  const [debateData, setDebateData] = useState({
    topic: "സ്മാർട്ട് ഫോൺ ഉപയോഗം വിദ്യാർത്ഥികളിൽ പാഠം മികവിന് സഹായകരമാണോ?",
    agreePercent: 20,
    differPercent: 80,
    timeLeft: 2 * 60 * 60 + 30 * 60 + 28, // 2 hours 30 mins 28 sec
  });

  const [timeRemaining, setTimeRemaining] = useState(debateData.timeLeft);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Convert seconds to HH:MM:SS format
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="bg-white shadow-sm border rounded-lg p-10 ">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full relative mb-3">
        <div
          className="absolute left-0 top-0 h-2 bg-green-500 rounded-l-full"
          style={{ width: `${debateData.agreePercent}%` }}
        ></div>
        <div
          className="absolute right-0 top-0 h-2 bg-red-500 rounded-r-full"
          style={{ width: `${debateData.differPercent}%` }}
        ></div>
      </div>

      {/* Labels for progress */}
      <div className="flex justify-between text-xs text-gray-600 mb-3">
        <span className="text-green-600 font-medium">
          {debateData.agreePercent}% Agree
        </span>
        <span className="text-red-600 font-medium">
          {debateData.differPercent}% Differ
        </span>
      </div>

      {/* Debate Topic Section */}
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-800 leading-snug max-w-[85%]">
          {debateData.topic}
        </h2>

        <div className="text-right">
          <p className="text-sm font-mono text-gray-700">
            {formatTime(timeRemaining)}
          </p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <button className="text-blue-500 hover:underline">
          See Translation
        </button>
        <div className="flex space-x-3">
          <button className="hover:text-gray-700">⋮</button>
        </div>
      </div>
    </div>
  );
};

export default ActiveDebateHeader;
