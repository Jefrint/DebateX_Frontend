import React, { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  Flame,
} from "lucide-react";

const CommentCard = () => {
  // Hardcoded for now — replace with backend data later
  const [comment, setComment] = useState({
    user: {
      name: "Sam",
      role: "Top Contributor",
      avatar: "/assets/user1.jpg",
    },
    time: "10m ago",
    text: "സ്മാർട്ട് ഫോൺ വിദ്യാർത്ഥികളുടെ പഠനത്തിന് പുതിയ സാമൂഹിക വിധങ്ങൾ കൊണ്ടുവരുന്നു. എന്റെ അഭിപ്രായത്തിൽ, അത് അനാവശ്യമായ ശ്രദ്ധാഭംഗം മാത്രമല്ല, മറിച്ച് പഠനത്തിൽ നിന്നും വിദ്യാർത്ഥികളെ വഴിതെറ്റിക്കുന്നു. ഈ മാറ്റങ്ങൾക്ക് വിദ്യാലയങ്ങൾ ശാസ്ത്രീയമായി പ്രതികരിക്കണം.",
    likes: 12100,
    replies: 100,
    dislikes: 620,
    shares: 100000,
    isTrending: true,
  });

  // Helper to format numbers like 12.1k, 100k
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  // Placeholder action handlers
  const handleLike = () =>
    setComment((prev) => ({ ...prev, likes: prev.likes + 1 }));

  const handleDislike = () =>
    setComment((prev) => ({ ...prev, dislikes: prev.dislikes + 1 }));

  const handleReply = () =>
    setComment((prev) => ({ ...prev, replies: prev.replies + 1 }));

  const handleShare = () =>
    setComment((prev) => ({ ...prev, shares: prev.shares + 1 }));

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-4 mb-4 border border-gray-100">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src={comment.user.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-800">{comment.user.name}</h4>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                {comment.user.role}
              </span>
            </div>
            <p className="text-xs text-gray-500">{comment.time}</p>
          </div>
        </div>

        {comment.isTrending && (
          <div className="flex items-center text-red-500 text-sm font-medium">
            <Flame className="w-4 h-4 mr-1" /> Trending
          </div>
        )}
      </div>

      {/* Comment Text */}
      <p className="text-sm text-gray-800 mt-3 leading-relaxed">
        {comment.text}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-6">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-green-600 hover:text-green-700"
          >
            <ThumbsUp className="w-4 h-4" /> {formatNumber(comment.likes)}
          </button>

          {/* Reply */}
          <button
            onClick={handleReply}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-700"
          >
            <MessageCircle className="w-4 h-4" /> {formatNumber(comment.replies)}
          </button>

          {/* Dislike */}
          <button
            onClick={handleDislike}
            className="flex items-center gap-1 text-red-500 hover:text-red-600"
          >
            <ThumbsDown className="w-4 h-4" /> {formatNumber(comment.dislikes)}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-700"
          >
            <Share2 className="w-4 h-4" /> {formatNumber(comment.shares)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
