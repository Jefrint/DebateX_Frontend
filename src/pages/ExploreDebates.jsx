import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OngoingDebateCard from "../components/DebateCard";
import UpcomingDebateCard from "../components/Up_Debates";
import InterestedArticleCard from "../components/Int_Article";
import PastDebateCard from "../components/PastDebates";
import { fetchExploreDebates, fetchManoramaArticles } from "../services/debates";

const categories = [
  "All",
  "Politics and Governance",
  "Education",
  "Health and Science",
  "Business and Economy",
  "Technology",
  "Sports",
  "General",
];

const ExploreDebates = () => {
  const ongoingRef = useRef(null);
  const upcomingRef = useRef(null);
  const pastRef = useRef(null);

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeOngoingIndex, setActiveOngoingIndex] = useState(0);
  const [data, setData] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
    articles: [],
  });
  const [manoramaArticles, setManoramaArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDebates = useCallback(async ({ showLoading = false } = {}) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      setError("");
      const response = await fetchExploreDebates();
      setData(response);
    } catch (err) {
      setError(err.message || "Unable to load debates right now.");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadDebates({ showLoading: true });
    fetchManoramaArticles().then(setManoramaArticles).catch(() => {});

    const interval = setInterval(() => {
      loadDebates();
    }, 10000);

    return () => clearInterval(interval);
  }, [loadDebates]);

  const filterByCategory = useCallback((debates) => {
    if (selectedCategory === "All") {
      return debates;
    }

    return debates.filter((debate) => debate.category === selectedCategory);
  }, [selectedCategory]);

  const filteredOngoingDebates = useMemo(
    () => data.ongoing,
    [data.ongoing]
  );

  const filteredUpcomingDebates = useMemo(
    () => filterByCategory(data.upcoming),
    [data.upcoming, filterByCategory]
  );

  const filteredPastDebates = useMemo(
    () => data.past,
    [data.past]
  );

  useEffect(() => {
    setActiveOngoingIndex(0);
  }, [filteredOngoingDebates.length]);

  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToPreviousOngoing = () => {
    setActiveOngoingIndex((current) =>
      current === 0 ? filteredOngoingDebates.length - 1 : current - 1
    );
  };

  const goToNextOngoing = () => {
    setActiveOngoingIndex((current) =>
      current === filteredOngoingDebates.length - 1 ? 0 : current + 1
    );
  };

  if (loading) {
    return <div className="mx-auto px-6 py-10 text-gray-600">Loading debates...</div>;
  }

  if (error) {
    return <div className="mx-auto px-6 py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="mx-auto px-6 py-10 scroll-smooth">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Explore Debates</h1>
      <p className="text-gray-600 mb-6">
        Engage with ongoing debates, revisit past discussions, and prepare for
        upcoming events.
      </p>

      <div className="flex space-x-6 border-b mb-6 text-gray-600 font-medium">
        <button
          onClick={() => handleScroll(ongoingRef)}
          className="pb-2 border-b-2 border-black text-black"
        >
          Ongoing Debates
        </button>
        <button
          onClick={() => handleScroll(upcomingRef)}
          className="pb-2 hover:text-black"
        >
          Upcoming Debates
        </button>
        <button
          onClick={() => handleScroll(pastRef)}
          className="pb-2 hover:text-black"
        >
          Past Debates
        </button>
      </div>

      <section ref={ongoingRef} id="ongoing">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Ongoing Debates ({filteredOngoingDebates.length})
          </h2>

          {filteredOngoingDebates.length > 1 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousOngoing}
                className="p-2 rounded-full border text-gray-700 hover:bg-gray-100"
                aria-label="Previous ongoing debate"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600">
                {activeOngoingIndex + 1} / {filteredOngoingDebates.length}
              </span>
              <button
                onClick={goToNextOngoing}
                className="p-2 rounded-full border text-gray-700 hover:bg-gray-100"
                aria-label="Next ongoing debate"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : null}
        </div>

        {filteredOngoingDebates.length > 0 ? (
          <div>
            <OngoingDebateCard debate={filteredOngoingDebates[activeOngoingIndex]} />
            {filteredOngoingDebates.length > 1 ? (
              <div className="flex justify-center gap-2 mt-4">
                {filteredOngoingDebates.map((debate, index) => (
                  <button
                    key={debate.id || debate.title}
                    onClick={() => setActiveOngoingIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeOngoingIndex === index
                        ? "w-8 bg-red-600"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Show ongoing debate ${index + 1}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-gray-500">No ongoing debates available.</p>
        )}
      </section>

      <section ref={upcomingRef} id="upcoming">
        <h2 className="text-lg font-semibold text-gray-800 mt-10 mb-4">
          Upcoming Debates
        </h2>

        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 border rounded-lg text-sm ${
                selectedCategory === cat
                  ? "bg-black text-white border-black"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUpcomingDebates.length > 0 ? (
            filteredUpcomingDebates.map((debate) => (
              <UpcomingDebateCard key={debate.id || debate.title} debate={debate} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full py-10">
              No upcoming debates available in this category.
            </p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Interested Articles
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {manoramaArticles.length > 0 ? (
            manoramaArticles.map((article) => (
              <InterestedArticleCard key={article.id || article.title} article={article} />
            ))
          ) : (
            <p className="text-gray-500">No related articles available.</p>
          )}
        </div>
      </section>

      <section ref={pastRef} id="past">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Past Debates
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPastDebates.length > 0 ? (
            filteredPastDebates.slice(0, 6).map((debate) => (
              <button
                key={debate.id || debate.title}
                type="button"
                onClick={() => debate.id && navigate(`/debate/${debate.id}`)}
                className="text-left transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={!debate.id}
              >
                <PastDebateCard debate={debate} />
              </button>
            ))
          ) : (
            <p className="text-gray-500">No past debates available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExploreDebates;
