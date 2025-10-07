import React, { useState } from "react";
import { ThumbsDown, MessageCirclePlus } from "lucide-react"; // using red icons

const DifferReactionBar = () => {
  // Hardcoded data for now
  const [reactions, setReactions] = useState({
    differCount: 5600,
    agreeCount: 12400,
    selected: null, // "agree" or "differ"
  });

  const formatCount = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const handleReaction = (type) => {
    setReactions((prev) => ({
      ...prev,
      selected: type,
      differCount:
        type === "differ" ? prev.differCount + 1 : prev.differCount,
      agreeCount:
        type === "agree" ? prev.agreeCount + 1 : prev.agreeCount,
    }));
  };

  return (
    <div className="bg-[#FDF5F5] flex items-center justify-between px-6 py-3 rounded-md shadow-sm max-w-lg mx-auto">
      {/* Left - Dislike (Thumbs Down) */}
      <div
        onClick={() => handleReaction("differ")}
        className={`flex flex-col items-center cursor-pointer ${
          reactions.selected === "differ" ? "text-red-600" : "text-gray-700"
        }`}
      >
        <div className="bg-red-100 rounded-full p-2">
          <ThumbsDown className="w-5 h-5 text-red-600" />
        </div>
        <p className="text-xs font-medium mt-1">
          {formatCount(reactions.agreeCount)}
        </p>
      </div>

      {/* Center Text */}
      <div className="text-sm font-semibold text-gray-800">Differ</div>

      {/* Right - Comment (Chat Plus Icon) */}
      <div
        onClick={() => handleReaction("comment")}
        className="flex flex-col items-center cursor-pointer text-gray-700"
      >
        <div className="bg-red-600 rounded-full p-2">
          <MessageCirclePlus className="w-5 h-5 text-white" />
        </div>
        <p className="text-xs font-medium mt-1 text-gray-700">
          {formatCount(reactions.differCount)}
        </p>
      </div>
    </div>
  );
};

export default DifferReactionBar;
