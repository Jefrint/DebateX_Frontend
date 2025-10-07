import React, { useState, useRef } from "react";
import OngoingDebateCard from "../components/DebateCard";
import UpcomingDebateCard from "../components/Up_Debates";
import InterestedArticleCard from "../components/Int_Article";
import PastDebateCard from "../components/PastDebates";

const ExploreDebates = () => {
  const ongoingRef = useRef(null);
  const upcomingRef = useRef(null);
  const pastRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const ongoingDebate = {
    title: "ക്രിപ്റ്റോകറൻസിയെ നിയമീകരിക്കണോ?",
    description:
      "ക്രിപ്റ്റോകറൻസിയുടെ വളർച്ച സമൂഹത്തിൽ എന്താണ് സ്വാധീനം ചെലുത്തുന്നത്? അത് സർക്കാരുകൾ നിയമീകരിക്കണമെന്നും നിയമങ്ങൾ എടുക്കണമെന്നും കാണുന്നുണ്ടോ?",
    startTime: "March 18, 2024, 12:00 PM IST",
    remaining: "2 Hours Left",
    participants: 200,
    agreePercent: 20,
    differPercent: 80,
    status: "LIVE",
    images: [
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=3",
      "https://i.pravatar.cc/40?img=4",
    ],
  };

  const articles = [
    {
      title: "ഭൂസമസ്യാ നീക്കം: സർക്കാരിന്റെ കോമീഷൻ റിപ്പോർട്ട് തർക്കത്തിൽ",
      image: "https://tpc.googlesyndication.com/simgad/18039604243181912191?",
      interestedCount: 985,
    },
    {
      title: "ഇന്റർനെറ്റ് സുരക്ഷ: യുവജനങ്ങൾക്കുള്ള മുന്നറിയിപ്പ്",
      image: "https://img-mm.manoramaonline.com/content/dam/mm/mo/news/just-in/images/2024/9/26/gautam-gambhir-rohit-sharma.jpg?crop=roi1&w=100&h=100",
      interestedCount: 985,
    },
    {
      title: "മാധ്യമങ്ങളിൽ സോഷ്യൽ മീഡിയയുടെ പങ്ക്",
      image: "https://img-mm.manoramaonline.com/content/dam/mm/mo/global-malayali/gulf/images/2024/3/27/shilpa-shetty.jpg?crop=fc&w=100&h=100",
      interestedCount: 985,
    }
  ];

  const upcomingDebates = [
    {
      title: "യുവതിയില്‍ ക്രിപ്റ്റോ ബുബിള്‍ ഉപയോഗിക്കാമോ?",
      category: "Technology",
      description:
        "ഡിജിറ്റല്‍ ആപ്ലിക്കേഷനില്‍ ക്രിപ്റ്റോ ബുബിള്‍ ഉപയോഗിക്കുന്നതിന് പുതിയ ട്രെന്‍ഡുകള്‍, സാങ്കേതികവിദ്യകള്‍, സാധ്യതകള്‍, ഭാവി സാധ്യതകള്‍ എന്നിവ ചര്‍ച്ച ചെയ്യും.",
      dateTime: "March 22, 2024, 4:00 PM IST",
      countdown: "2 Days Left",
    },
    {
      title: "തൊഴില്‍ നഷ്ടം തടയാന്‍ ആര്‍ക്കാണ് നിയമം?",
      category: "Technology",
      description:
        "ക്രിപ്റ്റോ ബുബിളിന്റെ വളർച്ച തൊഴിലില്‍ പ്രശ്നങ്ങളുണ്ടാക്കുമോ? തൊഴിലില്ലായ്മ തടയാന്‍ നിയമ നടപടികള്‍ വേണമോ?",
      dateTime: "March 22, 2024, 4:00 PM IST",
      countdown: "2 Days Left",
    },
    {
      title: "ജനാധിപത്യ രാജ്യങ്ങളില്‍ വോട്ടിംഗ് സംവിധാനം സാധ്യമാണോ?",
      category: "Politics and Governance",
      description:
        "ജനാധിപത്യത്തില്‍ വോട്ടിംഗ് പൂർണ്ണമായും കായികമായിരിക്കാമോ? വോട്ടിംഗ് നിയമങ്ങളില്‍ മാറ്റങ്ങള്‍ ജനങ്ങളുടെ പങ്കാളിത്തവും സുരക്ഷയും ഉറപ്പാക്കുമോ?",
      dateTime: "March 22, 2024, 4:00 PM IST",
      countdown: "2 Days Left",
    }
  ];

  const pastDebates = [
    {
      title: "കേരളത്തിലെ വെള്ളപ്പൊക്ക പ്രതിസന്ധിയിൽ ചെലവ് ചർച്ച ചെയ്യാം?",
      agree: 80,
      differ: 20,
      date: "March 22, 2024, 4:00 PM - 8:00 PM",
    },
    {
      title: "സ്മാർട്ട് ഫോൺ ഉപയോഗം വിദ്യാർത്ഥികളിൽ പാഠം തിരിച്ചടിയാക്കുമോ?",
      agree: 90,
      differ: 10,
      date: "March 22, 2024, 4:00 PM - 8:00 PM",
    },
    {
      title: "പഠനത്തിൽ സാങ്കേതിക വിദ്യയുടെ പങ്ക്: സഹായകമോ, വിലക്കമോ?",
      agree: 30,
      differ: 70,
      date: "March 22, 2024, 4:00 PM - 8:00 PM",
    },
    {
      title: "വോട്ടിംഗ് സംവിധാനത്തിൽ ഓൺലൈൻ മാറ്റം ആവശ്യമാണോ?",
      agree: 60,
      differ: 40,
      date: "March 22, 2024, 4:00 PM - 8:00 PM",
    },
    {
      title: "കേരളത്തിലെ വെള്ളപ്പൊക്ക പ്രതിസന്ധിയിൽ ചെലവ് ചർച്ച ചെയ്യാം?",
      agree: 20,
      differ: 80,
      date: "March 22, 2024, 4:00 PM - 8:00 PM",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredDebates =
    selectedCategory === "All"
      ? upcomingDebates
      : upcomingDebates.filter((debate) => debate.category === selectedCategory);

  return (
    <div className="mx-auto px-6 py-10 scroll-smooth">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Explore Debates</h1>
      <p className="text-gray-600 mb-6">
        Engage with ongoing debates, revisit past discussions, and prepare for
        upcoming events.
      </p>

      {/* Tabs */}
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

      {/* Ongoing Debates */}
      <section ref={ongoingRef} id="ongoing">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Ongoing Debates (1)
        </h2>
        <OngoingDebateCard debate={ongoingDebate} />
      </section>

      {/* Upcoming Debates */}
      <section ref={upcomingRef} id="upcoming">
        <h2 className="text-lg font-semibold text-gray-800 mt-10 mb-4">
          Upcoming Debates
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            "All",
            "Politics and Governance",
            "Education",
            "Health and Science",
            "Business and Economy",
            "Technology",
          ].map((cat) => (
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

        {/* Upcoming Debate Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDebates.length > 0 ? (
            filteredDebates.map((debate, i) => (
              <UpcomingDebateCard key={i} debate={debate} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full py-10">
              No upcoming debates available in this category.
            </p>
          )}
        </div>
      </section>

      {/* Interested Articles */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Interested Articles
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {articles.map((article, i) => (
            <InterestedArticleCard key={i} article={article} />
          ))}
        </div>
      </section>

      {/* Past Debates */}
      <section ref={pastRef} id="past">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Past Debates
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastDebates.map((debate, i) => (
            <PastDebateCard key={i} debate={debate} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreDebates;
