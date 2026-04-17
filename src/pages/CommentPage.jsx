import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DebateHeader from "../components/ActiveDebateHeader";
import CommentCard from "../components/CommentCard";
import DifferReactionBar from "../components/DifferReactionBar";
import ReactionBar from "../components/ReactionBar";
import { addComment, fetchDebateDetails, reactToComment } from "../services/debates";

function getSecondsUntil(endTime) {
  if (!endTime) {
    return 0;
  }

  const diffMs = new Date(endTime).getTime() - Date.now();
  return diffMs > 0 ? Math.floor(diffMs / 1000) : 0;
}

const DebateDiscussionPage = () => {
  const { debateId } = useParams();
  const [debate, setDebate] = useState(null);
  const [comments, setComments] = useState({ agree: [], differ: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submittingSide, setSubmittingSide] = useState("");
  const [commentDrafts, setCommentDrafts] = useState({
    agreeText: "",
    differText: "",
  });

  useEffect(() => {
    const loadDebate = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetchDebateDetails(debateId);
        setDebate(response.debate);
        setComments(response.comments);
      } catch (err) {
        setError(err.message || "Unable to load debate details.");
      } finally {
        setLoading(false);
      }
    };

    loadDebate();
  }, [debateId]);

  const handleCommentReaction = async (comment, reaction) => {
    try {
      return await reactToComment({
        debateId,
        commentId: comment.id,
        reaction,
      });
    } catch (err) {
      setError(err.message || "Unable to submit reaction.");
      throw err;
    }
  };

  const handleDraftChange = (field, value) => {
    setCommentDrafts((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitComment = async (side) => {
    const isAgree = side === debate?.sideA;
    const textField = isAgree ? "agreeText" : "differText";
    const commentText = commentDrafts[textField].trim();

    if (!commentText) {
      setError("Please write a comment before posting.");
      return;
    }

    try {
      setSubmittingSide(side);
      setError("");
      const response = await addComment({
        debateId,
        side,
        commentText,
      });

      if (response.visibleInDebate && response.comment) {
        const normalized = {
          id: response.comment.commentId,
          side: response.comment.side,
          text: response.comment.commentText,
          time: response.comment.createdAt,
          likes: response.comment.likeCount || 0,
          dislikes: response.comment.dislikeCount || 0,
          replies: 0,
          shares: 0,
          user: {
            name: response.comment.authorName || "Anonymous",
            role: "",
            avatar: "",
          },
        };

        setComments((prev) => ({
          ...prev,
          agree:
            side === debate.sideA ? [...prev.agree, normalized] : prev.agree,
          differ:
            side === debate.sideB ? [...prev.differ, normalized] : prev.differ,
        }));
      }

      setCommentDrafts((prev) => ({
        ...prev,
        [textField]: "",
      }));
    } catch (err) {
      setError(err.message || "Unable to submit comment.");
    } finally {
      setSubmittingSide("");
    }
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-8">Loading debate...</div>;
  }

  if (error && !debate) {
    return <div className="max-w-6xl mx-auto px-4 py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

      <DebateHeader
        title={debate?.title}
        agreePercent={debate?.agreePercent}
        differPercent={debate?.differPercent}
        initialTimeLeft={getSecondsUntil(debate?.endTime)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="p-4">
          <div className="mb-6">
            <ReactionBar
              agreeCount={comments.agree.length}
              differCount={comments.differ.length}
            />
          </div>
          <div className="bg-white border rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">{debate?.sideA}</h3>
            <p className="text-xs text-gray-500 mb-3">
              Your signed-in profile name will be used automatically.
            </p>
            <textarea
              value={commentDrafts.agreeText}
              onChange={(e) => handleDraftChange("agreeText", e.target.value)}
              placeholder={`Write your ${debate?.sideA?.toLowerCase() || "agree"} comment`}
              rows={4}
              className="w-full border rounded-md p-3 text-sm"
            />
            <button
              onClick={() => handleSubmitComment(debate?.sideA)}
              disabled={submittingSide === debate?.sideA}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-60"
            >
              {submittingSide === debate?.sideA ? "Posting..." : "Post Comment"}
            </button>
          </div>
          <div className="space-y-4">
            {comments.agree.length > 0 ? (
              comments.agree.map((comment) => (
                <CommentCard
                  key={comment.id || comment.text}
                  comment={comment}
                  onLike={(current) => handleCommentReaction(current, "LIKE")}
                  onDislike={(current) => handleCommentReaction(current, "DISLIKE")}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No comments for {debate?.sideA} yet.</p>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <DifferReactionBar
              differCount={comments.differ.length}
              agreeCount={comments.agree.length}
            />
          </div>
          <div className="bg-white border rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">{debate?.sideB}</h3>
            <p className="text-xs text-gray-500 mb-3">
              Your signed-in profile name will be used automatically.
            </p>
            <textarea
              value={commentDrafts.differText}
              onChange={(e) => handleDraftChange("differText", e.target.value)}
              placeholder={`Write your ${debate?.sideB?.toLowerCase() || "differ"} comment`}
              rows={4}
              className="w-full border rounded-md p-3 text-sm"
            />
            <button
              onClick={() => handleSubmitComment(debate?.sideB)}
              disabled={submittingSide === debate?.sideB}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-60"
            >
              {submittingSide === debate?.sideB ? "Posting..." : "Post Comment"}
            </button>
          </div>
          <div className="space-y-4">
            {comments.differ.length > 0 ? (
              comments.differ.map((comment) => (
                <CommentCard
                  key={comment.id || comment.text}
                  comment={comment}
                  onLike={(current) => handleCommentReaction(current, "LIKE")}
                  onDislike={(current) => handleCommentReaction(current, "DISLIKE")}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No comments for {debate?.sideB} yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateDiscussionPage;
