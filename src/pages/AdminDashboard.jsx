import React, { useState } from "react";
import { Loader2, Clock, Calendar, CheckCircle, Link2, Sparkles } from "lucide-react";
import { createDebate, fetchSuggestedTopics } from "../services/debates";

const AdminDashboard = () => {
  const [articleUrl, setArticleUrl] = useState("");
  const [suggestedTitles, setSuggestedTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");

  const generateAITopics = async () => {
    if (!articleUrl.trim()) {
      setError("Please paste an article URL first.");
      return;
    }

    try {
      setSelectedTitle("");
      setSuccess("");
      setSuggestedTitles([]);
      setLoading(true);
      setError("");
      const titles = await fetchSuggestedTopics(articleUrl.trim());
      setSuggestedTitles(titles.slice(0, 4));
    } catch (err) {
      setError(err.message || "Unable to generate topics.");
      setSuggestedTitles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDebateGenerate = async () => {
    if (!articleUrl.trim() || !selectedTitle || !startTime || !duration) {
      setError("Please fill all details before generating a debate.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createDebate({
        title: selectedTitle,
        topic: selectedTitle,
        description: "",
        sideA: "Agree",
        sideB: "Disagree",
        articleUrl: articleUrl.trim(),
        startTime: new Date(startTime).toISOString(),
        durationMinutes: Math.round(Number(duration) * 60),
      });

      setSuccess("Debate generated successfully.");
      setSuggestedTitles([]);
      setSelectedTitle("");
      setStartTime("");
      setDuration("");
    } catch (err) {
      setError(err.message || "Unable to create debate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
      {success ? <p className="mb-4 text-sm text-green-600">{success}</p> : null}

      <div className="bg-white shadow rounded-2xl border p-6">
        <div className="flex items-center gap-2 mb-2 text-gray-800">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Generate AI Debate Titles</h2>
        </div>
        <p className="text-sm text-gray-600 mb-5">
          Paste a Manorama article URL and let the moderator AI generate up to 4 debate titles.
        </p>

        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Link2 size={16} /> Article URL
            </label>
            <input
              type="url"
              value={articleUrl}
              onChange={(e) => setArticleUrl(e.target.value)}
              placeholder="https://www.manoramaonline.com/..."
              className="w-full border rounded-md p-3 mt-1 text-sm"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={generateAITopics}
              disabled={loading}
              className="w-full md:w-auto bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Titles"}
            </button>
          </div>
        </div>
      </div>

      {(loading || suggestedTitles.length > 0) && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            AI Suggested Titles
          </h2>
          <p className="text-sm text-gray-600 mb-5 break-all">{articleUrl}</p>

          {loading && suggestedTitles.length === 0 ? (
            <div className="flex items-center text-gray-600">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Generating titles...
            </div>
          ) : (
            <>
              <div className="space-y-2 mb-5">
                {suggestedTitles.map((title, index) => (
                  <div
                    key={`${title}-${index}`}
                    onClick={() => setSelectedTitle(title)}
                    className={`p-3 rounded-md cursor-pointer border ${
                      selectedTitle === title
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <span className="font-medium text-gray-500 mr-2">{index + 1}.</span>
                    {title}
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Calendar size={16} /> Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border rounded-md p-2 mt-1 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Clock size={16} /> Duration (hours)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border rounded-md p-2 mt-1 text-sm"
                    placeholder="2"
                  />
                </div>
              </div>

              <button
                onClick={handleDebateGenerate}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
              >
                <CheckCircle size={18} /> Generate Debate
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
