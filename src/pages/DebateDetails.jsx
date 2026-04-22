import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import DebateHeader from "../components/ActiveDebateHeader";
import { fetchDebateDetails } from "../services/debates";

function formatCount(value) {
  const count = Number(value || 0);
  return count.toLocaleString("en-IN");
}

function CommentList({ title, accentClass, comments }) {
  return (
    <section>
      <div className="mb-5 border-b pb-3">
        <h2 className={`text-2xl font-bold ${accentClass}`}>{title}</h2>
        <p className="text-sm text-gray-600">
          {comments.length} comment{comments.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <article
              key={comment.id || comment.text}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <p className="mb-4 text-sm leading-relaxed text-gray-800">
                {comment.text}
              </p>

              <div className="mb-3 border-b pb-3 text-xs text-gray-500">
                <span className="font-medium text-gray-700">
                  {comment.user?.name || "Anonymous"}
                </span>
                {comment.time ? <span> | {comment.time}</span> : null}
              </div>

              <div className="flex items-center gap-5 text-sm text-gray-700">
                <span className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                  {formatCount(comment.likes)}
                </span>
                <span className="flex items-center gap-2">
                  <ThumbsDown className="h-4 w-4 text-red-500" />
                  {formatCount(comment.dislikes)}
                </span>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-gray-300 py-8 text-center text-gray-500">
            No comments for {title}.
          </p>
        )}
      </div>
    </section>
  );
}

const DebateDetails = () => {
  const { id } = useParams();

  const [debate, setDebate] = useState(null);
  const [comments, setComments] = useState({ agree: [], differ: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDebate = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetchDebateDetails(id);
        setDebate(response.debate);
        setComments(response.comments);
      } catch (err) {
        setError(err.message || "Unable to load debate details.");
      } finally {
        setLoading(false);
      }
    };

    loadDebate();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center text-gray-600">
          Loading debate details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="mb-4 text-red-600">{error}</p>
        <Link to="/" className="text-sm font-medium text-gray-800 underline">
          Back to Explore Debates
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/"
        className="mb-4 inline-block text-sm font-medium text-gray-600 hover:text-black"
      >
        Back to Explore Debates
      </Link>

      <DebateHeader
        title={debate?.title}
        agreePercent={debate?.agreePercent}
        differPercent={debate?.differPercent}
        initialTimeLeft={0}
      />

      <p className="mb-8 text-gray-600">
        This debate has concluded. Below are all the comments from both sides.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <CommentList
          title={debate?.sideA || "Agree"}
          accentClass="text-green-600"
          comments={comments.agree}
        />

        <CommentList
          title={debate?.sideB || "Differ"}
          accentClass="text-red-600"
          comments={comments.differ}
        />
      </div>

      {comments.agree.length === 0 && comments.differ.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600">
            No comments available for this debate.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default DebateDetails;
