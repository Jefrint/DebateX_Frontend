import React, { useState } from "react";
import DebateHeader from "../components/ActiveDebateHeader";
import CommentCard from "../components/CommentCard";
import DifferReactionBar from "../components/DifferReactionBar";
import ReactionBar from "../components/ReactionBar";

const DebateDiscussionPage = () => {
  // Mock data
  const debate = {
    title: "സ്മാർട്ട് ഫോൺ ഉപയോഗം വിദ്യാർത്ഥികളിൽ പാഠം തിരിച്ചടിയാക്കുമോ?",
    agreePercent: 20,
    differPercent: 80,
    timeRemaining: "02:30:28",
  };

  const comments = {
    Agree: [
      {
        user: "Sam",
        tag: "Top Contributor",
        trending: true,
        time: "10m ago",
        text: "സ്മാർട്ട് ഫോൺ വിദ്യാർത്ഥികളുടെ പഠനത്തിൽ പാഠം തിരിച്ചടിയാക്കുന്നു. അവർ കൂടുതൽ സമയം സോഷ്യൽ മീഡിയയിലും ഗെയിംസിലും ചെലവഴിക്കുന്നു.",
        likes: 12100,
        dislikes: 200,
        replies: 620,
      },
      {
        user: "Anu",
        tag: "Active Participant",
        trending: false,
        time: "30m ago",
        text: "വിദ്യാർത്ഥികൾക്ക് നിയന്ത്രണം ഇല്ലാതെ ഫോൺ ഉപയോഗിക്കുന്നത് വളരെ അപകടകരമാണ്.",
        likes: 5300,
        dislikes: 100,
        replies: 120,
      },
    ],
    Differ: [
      {
        user: "Athul S",
        tag: null,
        trending: false,
        time: "10m ago",
        text: "മൊബൈൽ ഫോൺ അതിന്റെ ശരിയായ ഉപയോഗം വിദ്യാർത്ഥികൾക്ക് എളുപ്പത്തിൽ പഠിക്കാൻ സഹായിക്കുന്നു. ഓൺലൈൻ ക്ലാസുകളും ഗവേഷണത്തിനും അനിവാര്യമാണ്.",
        likes: 12100,
        dislikes: 100,
        replies: 620,
      },
      {
        user: "Nisha",
        tag: "Educator",
        trending: true,
        time: "25m ago",
        text: "സാങ്കേതിക വിദ്യ പഠന പ്രക്രിയയിൽ വിദ്യാർത്ഥികളെ കൂടുതൽ ആകർഷിക്കുന്നു.",
        likes: 8400,
        dislikes: 220,
        replies: 210,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Debate Header */}
      <DebateHeader
        title={debate.title}
        agreePercent={debate.agreePercent}
        differPercent={debate.differPercent}
        timeRemaining={debate.timeRemaining}
      />

      {/* Two-column Debate Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Agree Column */}
        <div className="p-4 ">
          
          <div className=" mb-6">
            <ReactionBar />
          </div>
          <div className="space-y-4">
            {comments.Agree.length > 0 ? (
              comments.Agree.map((comment, i) => (
                <CommentCard key={i} comment={comment} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No comments for Agree yet.
              </p>
            )}
          </div>
        </div>

        {/* Differ Column */}
        <div className=" p-4 ">
          
          <div className=" mb-6">
            <DifferReactionBar />
          </div>
          <div className="space-y-4">
            {comments.Differ.length > 0 ? (
              comments.Differ.map((comment, i) => (
                <CommentCard key={i} comment={comment} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No comments for Differ yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateDiscussionPage;
