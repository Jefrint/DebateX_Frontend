import React from "react";
import ReactionBar from "../components/ReactionBar";
import DifferReactionBar from "../components/DifferReactionBar";
import ActiveDebateHeader from "../components/ActiveDebateHeader";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ActiveDebateHeader
        title="Active debate preview"
        agreePercent={0}
        differPercent={0}
        initialTimeLeft={0}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <ReactionBar agreeCount={0} differCount={0} />
        <DifferReactionBar agreeCount={0} differCount={0} />
      </div>
    </div>
  );
};

export default Home;
