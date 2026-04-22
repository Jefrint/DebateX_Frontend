import React from "react";
import { MessageCirclePlus } from "lucide-react";

const ReactionBar = ({ count = 0 }) => {
  const formatCount = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  };

  return (
    <div className="bg-[#F5F9FF] flex items-center justify-between px-6 py-3 rounded-md shadow-sm max-w-lg mx-auto">
      <div className="w-10" />

      <div className="text-sm font-semibold text-gray-800">Agree</div>

      <div className="flex flex-col items-center text-gray-700">
        <div className="bg-green-600 rounded-full p-2">
          <MessageCirclePlus className="w-5 h-5 text-white" />
        </div>
        <p className="text-xs font-medium mt-1 text-gray-700">
          {formatCount(count)}
        </p>
      </div>
    </div>
  );
};

export default ReactionBar;
