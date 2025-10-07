import React, { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  Flame,
} from "lucide-react";

const CommentCard = ({ comment }) => {
  const [commentState, setCommentState] = useState(comment);

  // Helper to format numbers like 12.1k, 100k
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  // Action handlers
  const handleLike = () =>
    setCommentState((prev) => ({ ...prev, likes: prev.likes + 1 }));

  const handleDislike = () =>
    setCommentState((prev) => ({ ...prev, dislikes: prev.dislikes + 1 }));

  const handleReply = () =>
    setCommentState((prev) => ({ ...prev, replies: prev.replies + 1 }));

  const handleShare = () =>
    setCommentState((prev) => ({ ...prev, shares: prev.shares + 1 }));

  return (
    <div className=" bg-white rounded-xl shadow p-4 mb-4 border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src={
              commentState.user?.avatar ||
              "https://ui-avatars.com/api/?name=" + commentState.user?.name
            }
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-800">
                {commentState.user?.name}
              </h4>
              {commentState.user?.role && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  {commentState.user.role}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{commentState.time}</p>
          </div>
        </div>

        {commentState.isTrending && (
          <div className="flex items-center text-red-500 text-sm font-medium">
            <Flame className="w-4 h-4 mr-1" /> Trending
          </div>
        )}
      </div>

      {/* Comment Text */}
      <p className="text-sm text-gray-800 mt-3 leading-relaxed">
        {commentState.text}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-6">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-green-600 hover:text-green-700"
          >
            <ThumbsUp className="w-4 h-4" /> {formatNumber(commentState.likes)}
          </button>

          {/* Reply */}
          <button
            onClick={handleReply}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-700"
          >
            <MessageCircle className="w-4 h-4" />{" "}
            {formatNumber(commentState.replies)}
          </button>

          {/* Dislike */}
          <button
            onClick={handleDislike}
            className="flex items-center gap-1 text-red-500 hover:text-red-600"
          >
            <ThumbsDown className="w-4 h-4" />{" "}
            {formatNumber(commentState.dislikes)}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-700"
          >
            <Share2 className="w-4 h-4" /> {formatNumber(commentState.shares)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
