import React, { useEffect, useMemo, useRef, useState } from "react";
import OngoingDebateCard from "../components/DebateCard";
import UpcomingDebateCard from "../components/Up_Debates";
import InterestedArticleCard from "../components/Int_Article";
import PastDebateCard from "../components/PastDebates";
import { fetchExploreDebates } from "../services/debates";

const categories = [
  "All",
  "Politics and Governance",
  "Education",
  "Health and Science",
  "Business and Economy",
  "Technology",
];

const ExploreDebates = () => {
  const ongoingRef = useRef(null);
  const upcomingRef = useRef(null);
  const pastRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [data, setData] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
    articles: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDebates = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetchExploreDebates();
        setData(response);
      } catch (err) {
        setError(err.message || "Unable to load debates right now.");
      } finally {
        setLoading(false);
      }
    };

    loadDebates();
  }, []);

  const filteredDebates = useMemo(() => {
    if (selectedCategory === "All") {
      return data.upcoming;
    }

    return data.upcoming.filter((debate) => debate.category === selectedCategory);
  }, [data.upcoming, selectedCategory]);

  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Ongoing Debates ({data.ongoing.length})
        </h2>
        {data.ongoing.length > 0 ? (
          <OngoingDebateCard debate={data.ongoing[0]} />
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
          {filteredDebates.length > 0 ? (
            filteredDebates.map((debate) => (
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
          {data.articles.length > 0 ? (
            data.articles.map((article) => (
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
          {data.past.length > 0 ? (
            data.past.map((debate) => (
              <PastDebateCard key={debate.id || debate.title} debate={debate} />
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
