import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";

const ActiveDebateHeader = () => {
  const [debateData] = useState({
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
    <div className="bg-white shadow-md border rounded-xl px-6 py-6 sm:py-8 mb-6 max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-2 bg-green-500"
          style={{ width: `${debateData.agreePercent}%` }}
        ></div>
        <div
          className="absolute right-0 top-0 h-2 bg-red-500"
          style={{ width: `${debateData.differPercent}%` }}
        ></div>
      </div>

      {/* Percent Labels */}
      <div className="flex justify-between text-sm mb-3">
        <span className="text-green-600 font-semibold">
          {debateData.agreePercent}% Agree
        </span>
        <span className="text-red-600 font-semibold">
          {debateData.differPercent}% Differ
        </span>
      </div>

      {/* Topic and Timer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug max-w-3xl">
          {debateData.topic}
        </h2>

        <div className="mt-3 sm:mt-0">
          <p className="text-base font-mono text-gray-800 bg-gray-100 px-3 py-1 rounded-lg shadow-inner">
            {formatTime(timeRemaining)}
          </p>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <button className="text-blue-600 hover:underline">See Translation</button>

        <button className="hover:text-gray-800 transition">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ActiveDebateHeader;
