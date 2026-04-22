import React, { useEffect, useState } from "react";
import {
  Loader2,
  Clock,
  Calendar,
  CheckCircle,
  Link2,
  RefreshCw,
  Sparkles,
  Tag,
  Type,
  XCircle,
} from "lucide-react";
import {
  cancelDebate,
  createDebate,
  fetchAllDebates,
  fetchSuggestedTopics,
} from "../services/debates";

const debateCategories = [
  "Politics and Governance",
  "Education",
  "Health and Science",
  "Business and Economy",
  "Technology",
  "Sports",
  "General",
];

const AdminDashboard = () => {
  const [articleUrl, setArticleUrl] = useState("");
  const [suggestedTitles, setSuggestedTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [manualTitle, setManualTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [debates, setDebates] = useState([]);
  const [debatesLoading, setDebatesLoading] = useState(true);
  const [cancelingDebateId, setCancelingDebateId] = useState("");

  const loadDebates = async () => {
    try {
      setDebatesLoading(true);
      const response = await fetchAllDebates();
      setDebates(response);
    } catch (err) {
      setError(err.message || "Unable to load debates.");
    } finally {
      setDebatesLoading(false);
    }
  };

  useEffect(() => {
    loadDebates();
  }, []);

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
    const finalTitle = manualTitle.trim() || selectedTitle;

    if (!articleUrl.trim() || !finalTitle || !startTime || !duration) {
      setError("Please fill all details before generating a debate.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createDebate({
        title: finalTitle,
        topic: finalTitle,
        description: "",
        category: selectedCategory,
        sideA: "Agree",
        sideB: "Disagree",
        articleUrl: articleUrl.trim(),
        startTime: new Date(startTime).toISOString(),
        durationMinutes: Math.round(Number(duration) * 60),
      });

      setSuccess("Debate generated successfully.");
      setSuggestedTitles([]);
      setSelectedTitle("");
      setManualTitle("");
      setSelectedCategory("Technology");
      setStartTime("");
      setDuration("");
      await loadDebates();
    } catch (err) {
      setError(err.message || "Unable to create debate.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDebate = async (debate) => {
    const shouldCancel = window.confirm(`Cancel this debate?\n\n${debate.title}`);
    if (!shouldCancel) {
      return;
    }

    try {
      setCancelingDebateId(debate.id);
      setError("");
      setSuccess("");
      await cancelDebate(debate.id);
      setSuccess("Debate cancelled successfully.");
      await loadDebates();
    } catch (err) {
      setError(err.message || "Unable to cancel debate.");
    } finally {
      setCancelingDebateId("");
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

      <div className="mt-8 bg-white p-6 rounded-lg shadow border">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Create Debate Details
              </h2>
              <p className="text-sm text-gray-600 mt-1 break-all">{articleUrl}</p>
            </div>

            {suggestedTitles.length > 0 ? (
              <button
                onClick={generateAITopics}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 border border-blue-200 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50 disabled:opacity-60"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh Titles
              </button>
            ) : null}
          </div>

          {loading && suggestedTitles.length === 0 ? (
            <div className="flex items-center text-gray-600">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Generating titles...
            </div>
          ) : (
            <>
              {suggestedTitles.length > 0 ? (
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
              ) : (
                <p className="mb-5 text-sm text-gray-500">
                  Generate AI titles from an article URL, or type a manual title below.
                </p>
              )}

              <div className="mb-5">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Type size={16} /> Manual Debate Title
                </label>
                <input
                  type="text"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Type your own debate title, or leave blank to use the selected AI title"
                  className="w-full border rounded-md p-2 mt-1 text-sm placeholder:text-gray-400 placeholder:font-normal"
                />
                <p className="text-xs text-gray-500 mt-1">
                  If you enter a manual title, it will be used instead of the selected AI title.
                </p>
              </div>

              <div className="mb-5">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Tag size={16} /> Debate Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border rounded-md p-2 mt-1 text-sm bg-white"
                >
                  {debateCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  This tag is used by Explore Debates filters.
                </p>
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
                    className="w-full border rounded-md p-2 mt-1 text-sm placeholder:text-gray-400 placeholder:font-normal"
                    placeholder="Example: 2 hours"
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

      <div className="mt-8 bg-white p-6 rounded-lg shadow border">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Manage Debates</h2>
            <p className="text-sm text-gray-600 mt-1">
              Cancel upcoming or ongoing debates from the admin dashboard.
            </p>
          </div>
          <button
            onClick={loadDebates}
            disabled={debatesLoading}
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${debatesLoading ? "animate-spin" : ""}`} />
            Refresh List
          </button>
        </div>

        {debatesLoading ? (
          <div className="flex items-center text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading debates...
          </div>
        ) : debates.length > 0 ? (
          <div className="space-y-3">
            {debates.map((debate) => {
              const isCancelled = debate.status === "CANCELLED";
              const canCancel = !["CANCELLED", "ENDED"].includes(debate.status);

              return (
                <div
                  key={debate.id}
                  className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {debate.category}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          isCancelled
                            ? "bg-gray-100 text-gray-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {debate.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800">{debate.title}</h3>
                    <p className="text-sm text-gray-500">
                      {debate.dateTime || debate.startTime || "No start time set"}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCancelDebate(debate)}
                    disabled={!canCancel || cancelingDebateId === debate.id}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    <XCircle className="w-4 h-4" />
                    {cancelingDebateId === debate.id ? "Cancelling..." : "Cancel"}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No debates available yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
