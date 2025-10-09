import React, { useState } from "react";
import { Loader2, Clock, Calendar, CheckCircle } from "lucide-react";

const AdminDashboard = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "സ്മാർട്ട്‌ഫോൺ ഉപയോഗം വിദ്യാർത്ഥികളുടെ പഠനത്തിൽ എങ്ങനെ ബാധിക്കുന്നു?",
      summary: "വിദ്യാഭ്യാസ രംഗത്ത് സ്മാർട്ട്‌ഫോണിന്റെ പ്രാധാന്യം കൂടി വരുമ്പോൾ അതിന്റെ ദോഷഫലങ്ങൾ ചർച്ചയാകുന്നു.",
    },
    {
      id: 2,
      title: "കേരളത്തിലെ കാർഷിക മേഖലയിലെ പുതുമകൾ",
      summary: "പുതിയ കാർഷിക സാങ്കേതിക വിദ്യകൾ കേരളത്തിലെ കർഷകരെ എങ്ങനെ സ്വാധീനിക്കുന്നു എന്നതാണ് വിഷയം.",
    },
  ]);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [suggestedTopics, setSuggestedTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");

  // Simulated AI topic generation
  const generateAITopics = (article) => {
    setSelectedArticle(article);
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setSuggestedTopics([
        "വിദ്യാഭ്യാസ രംഗത്ത് സ്മാർട്ട്‌ഫോണിന്റെ സ്വാധീനം എന്താണ്?",
        "സ്മാർട്ട്‌ഫോൺ വിദ്യാർത്ഥികളുടെ ശ്രദ്ധയെ ബാധിക്കുന്നുണ്ടോ?",
        "പഠനത്തിൽ ടെക്നോളജി അതിരുകടക്കുകയാണോ?",
      ]);
      setLoading(false);
    }, 1500);
  };

  const handleDebateGenerate = () => {
    if (!selectedTopic || !startTime || !duration) {
      alert("ദയവായി എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക!");
      return;
    }

    // Later integrate backend call here
    console.log({
      topic: selectedTopic,
      article: selectedArticle.title,
      startTime,
      duration,
    });

    alert("Debate Generated Successfully ✅");
    setSelectedArticle(null);
    setSuggestedTopics([]);
    setSelectedTopic("");
    setStartTime("");
    setDuration("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🛠 Admin Dashboard</h1>

      {/* Articles Section */}
      <div className="grid md:grid-cols-2 gap-5">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow p-4 rounded-lg border hover:border-blue-500 transition cursor-pointer"
            onClick={() => generateAITopics(article)}
          >
            <h2 className="font-semibold text-gray-800 mb-2">{article.title}</h2>
            <p className="text-sm text-gray-600">{article.summary}</p>
          </div>
        ))}
      </div>

      {/* AI Topic Suggestions */}
      {selectedArticle && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            AI Suggested Topics for:{" "}
            <span className="text-blue-600">{selectedArticle.title}</span>
          </h2>

          {loading ? (
            <div className="flex items-center text-gray-600">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Generating topics...
            </div>
          ) : (
            <>
              <div className="space-y-2 mb-5">
                {suggestedTopics.map((topic, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-3 rounded-md cursor-pointer border ${
                      selectedTopic === topic
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {topic}
                  </div>
                ))}
              </div>

              {/* Set Time & Duration */}
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
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border rounded-md p-2 mt-1 text-sm"
                    placeholder="2"
                  />
                </div>
              </div>

              <button
                onClick={handleDebateGenerate}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
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
