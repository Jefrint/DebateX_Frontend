import React from "react";
import OngoingDebateCard from "../components/DebateCard";
import UpcomingDebateCard from "../components/Up_Debates";

const ExploreDebates = () => {
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
    },
  ];

  return (
    <div className=" mx-auto px-6 py-10">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Explore Debates</h1>
      <p className="text-gray-600 mb-6">
        Engage with ongoing debates, revisit past discussions, and prepare for
        upcoming events.
      </p>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-6 text-gray-600 font-medium">
        <button className="pb-2 border-b-2 border-black text-black">
          Ongoing Debates
        </button>
        <button className="pb-2 hover:text-black">Upcoming Debates</button>
        <button className="pb-2 hover:text-black">Past Debates</button>
      </div>

      {/* Ongoing Debates */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Ongoing Debates (1)
      </h2>
      <OngoingDebateCard debate={ongoingDebate} />

      {/* Upcoming Debates */}
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
            className="px-4 py-1 border rounded-lg text-sm text-gray-700 hover:bg-gray-100"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Upcoming Debate Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {upcomingDebates.map((debate, i) => (
          <UpcomingDebateCard key={i} debate={debate} />
        ))}
      </div>
    </div>
  );
};

export default ExploreDebates;
