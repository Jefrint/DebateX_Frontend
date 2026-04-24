import React, { useEffect, useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Flame,
} from "lucide-react";

const CommentCard = ({ comment, onLike, onDislike }) => {
  const [commentState, setCommentState] = useState(comment);
  const [reacting, setReacting] = useState(false);

  useEffect(() => {
    setCommentState(comment);
  }, [comment]);

  // Helper to format numbers like 12.1k, 100k
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const getOptimisticReactionState = (state, reaction) => {
    const currentReaction = state.userReaction || null;
    const nextReaction = currentReaction === reaction ? null : reaction;
    let nextLikes = state.likes || 0;
    let nextDislikes = state.dislikes || 0;

    if (currentReaction === "LIKE") {
      nextLikes = Math.max(0, nextLikes - 1);
    }

    if (currentReaction === "DISLIKE") {
      nextDislikes = Math.max(0, nextDislikes - 1);
    }

    if (nextReaction === "LIKE") {
      nextLikes += 1;
    }

    if (nextReaction === "DISLIKE") {
      nextDislikes += 1;
    }

    return {
      ...state,
      likes: nextLikes,
      dislikes: nextDislikes,
      userReaction: nextReaction,
    };
  };

  const handleReaction = async (reaction) => {
    const previousState = commentState;
    const action = reaction === "LIKE" ? onLike : onDislike;

    setReacting(true);
    setCommentState((prev) => getOptimisticReactionState(prev, reaction));

    try {
      const response = await action?.(previousState);
      if (response) {
        setCommentState((prev) => ({
          ...prev,
          likes: response.likeCount ?? prev.likes,
          dislikes: response.dislikeCount ?? prev.dislikes,
          userReaction: response.userReaction ?? null,
        }));
      }
    } catch {
      setCommentState(previousState);
    } finally {
      setReacting(false);
    }
  };

  const handleLike = () => handleReaction("LIKE");

  const handleDislike = () => handleReaction("DISLIKE");

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
            disabled={reacting}
            className={`flex items-center gap-1 hover:text-green-700 disabled:opacity-60 ${
              commentState.userReaction === "LIKE"
                ? "text-green-700 font-semibold"
                : "text-green-600"
            }`}
          >
            <ThumbsUp
              className="w-4 h-4"
              fill={commentState.userReaction === "LIKE" ? "currentColor" : "none"}
            />{" "}
            {formatNumber(commentState.likes)}
          </button>

          {/* Dislike */}
          <button
            onClick={handleDislike}
            disabled={reacting}
            className={`flex items-center gap-1 hover:text-red-600 disabled:opacity-60 ${
              commentState.userReaction === "DISLIKE"
                ? "text-red-600 font-semibold"
                : "text-red-500"
            }`}
          >
            <ThumbsDown
              className="w-4 h-4"
              fill={commentState.userReaction === "DISLIKE" ? "currentColor" : "none"}
            />{" "}
            {formatNumber(commentState.dislikes)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
