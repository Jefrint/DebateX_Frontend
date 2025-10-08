import React, { useState } from "react";
import { ThumbsUp, MessageCirclePlus } from "lucide-react";
import CommentBox from "./CommentBox";

const ReactionBar = () => {
  const [reactions, setReactions] = useState({
    agreeCount: 12400,
    differCount: 1200,
    selected: null,
  });

  const [showOverlay, setShowOverlay] = useState(false);

  const formatCount = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  };

  const handleReaction = (type) => {
    if (type === "differ") setShowOverlay(true); // open overlay on differ click

    setReactions((prev) => ({
      ...prev,
      selected: type,
      agreeCount: type === "agree" ? prev.agreeCount + 1 : prev.agreeCount,
      differCount: type === "differ" ? prev.differCount + 1 : prev.differCount,
    }));
  };

  return (
    <>
      <div className="bg-[#F5F9FF] flex items-center justify-between px-6 py-3 rounded-md shadow-sm max-w-sm mx-auto">
        {/* Agree */}
        <div
          onClick={() => handleReaction("agree")}
          className={`flex flex-col items-center cursor-pointer ${
            reactions.selected === "agree" ? "text-green-600" : "text-gray-700"
          }`}
        >
          <div className="bg-green-100 rounded-full p-2">
            <ThumbsUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xs font-medium mt-1">
            {formatCount(reactions.agreeCount)}
          </p>
        </div>

        <div className="text-sm font-semibold text-gray-800">Agree</div>

        {/* Differ */}
        <div
          onClick={() => handleReaction("differ")}
          className={`flex flex-col items-center cursor-pointer ${
            reactions.selected === "differ" ? "text-green-600" : "text-gray-700"
          }`}
        >
          <div className="bg-green-600 rounded-full p-2">
            <MessageCirclePlus className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs font-medium mt-1 text-gray-700">
            {formatCount(reactions.differCount)}
          </p>
        </div>
      </div>

      {showOverlay && < CommentBox onClose={() => setShowOverlay(false)} />}
    </>
  );
};

export default ReactionBar;
