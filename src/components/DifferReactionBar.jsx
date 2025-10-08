import React, { useState, useEffect } from "react";
import { ThumbsDown, MessageCirclePlus } from "lucide-react";
import CommentBox from "./CommentBox";

const DifferReactionBar = ({ debate, stats }) => {
  const [reactions, setReactions] = useState({
    agreeCount: stats?.agreeCount || 0,
    differCount: stats?.differCount || 0,
    selected: null, // "agree" or "differ"
  });

  const [showOverlay, setShowOverlay] = useState(false);

  // Update counts if stats change
  useEffect(() => {
    setReactions((prev) => ({
      ...prev,
      agreeCount: stats?.agreeCount || 0,
      differCount: stats?.differCount || 0,
    }));
  }, [stats]);

  const formatCount = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  };

  const handleReaction = (type) => {
    if (type === "comment") {
      setShowOverlay(true);
      type = "differ"; // Treat comment click as differ reaction
    }

    setReactions((prev) => ({
      ...prev,
      selected: type,
      differCount: type === "differ" ? prev.differCount + 1 : prev.differCount,
      agreeCount: type === "agree" ? prev.agreeCount + 1 : prev.agreeCount,
    }));
  };

  return (
    <>
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
          <p className="text-xs font-medium mt-1">{formatCount(reactions.differCount)}</p>
        </div>

        {/* Center Text */}
        <div className="text-sm font-semibold text-gray-800">Differ</div>

        {/* Right - Comment (Chat Plus Icon) */}
        <div
          onClick={() => handleReaction("comment")}
          className={`flex flex-col items-center cursor-pointer ${
            reactions.selected === "comment" ? "text-red-600" : "text-gray-700"
          }`}
        >
          <div className="bg-red-600 rounded-full p-2">
            <MessageCirclePlus className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs font-medium mt-1">{formatCount(reactions.differCount)}</p>
        </div>
      </div>

      {/* Comment overlay */}
      {showOverlay && <CommentBox onClose={() => setShowOverlay(false)} debate={debate} stats={stats} />}
    </>
  );
};

export default DifferReactionBar;
