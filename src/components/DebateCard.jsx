import React, { useEffect, useState } from "react";

const DebateCard = () => {
  const [debate, setDebate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch debate data from backend
  useEffect(() => {
    const fetchDebate = async () => {
      try {
        // TODO: Replace this with your FastAPI endpoint later
        // Example: const response = await fetch("http://127.0.0.1:8000/debates/ongoing");
        // const data = await response.json();

        // Mock hardcoded data (for now)
        const data = {
          id: 1,
          title: "ഭാഷ നഷ്ടപ്പെട്ടാൽ തിരിച്ചറിയൽ നഷ്ടപ്പെടും?",
          description:
            "മലയാള ഭാഷയുടെ നിലനിൽപ്പ് സുരക്ഷിതമാണോ?",
          startTime: "March 18, 2024, 12:00 PM IST",
          timeRemaining: "2 Hours Left",
          participants: 200,
          avatars: [
            "/assets/user1.jpg",
            "/assets/user2.jpg",
            "/assets/user3.jpg",
            "/assets/user4.jpg",
            "/assets/user5.jpg",
          ],
          agreePercent: 20,
          differPercent: 80,
          status: "LIVE",
        };

        setDebate(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching debate:", error);
        setLoading(false);
      }
    };

    fetchDebate();
  }, []);

  if (loading) return <p className="text-center">Loading debate...</p>;
  if (!debate) return <p className="text-center">No debate available</p>;

  return (
    <div className="w-full max-w-6xl mx-auto bg-white border border-green-400 rounded-lg shadow-sm p-5">
      {/* Debate Question */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{debate.title}</h2>
        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          {debate.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{debate.description}</p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
        <div>
          <span className="font-semibold">Start Time:</span>
          <p>{debate.startTime}</p>
        </div>
        <div>
          <span className="font-semibold">Time Remaining:</span>
          <p>{debate.timeRemaining}</p>
        </div>
      </div>

      {/* Join Debate Button & Participants */}
      <div className="flex items-center justify-between">
        <button className="bg-red-600 text-white px-5 py-2 rounded-md font-medium hover:bg-red-700">
          Join Debate
        </button>

        <div className="flex items-center">
          {/* Avatars */}
          <div className="flex -space-x-2">
            {debate.avatars.map((avatar, idx) => (
              <img
                key={idx}
                className="w-8 h-8 rounded-full border border-white"
                src={avatar}
                alt={`User ${idx + 1}`}
              />
            ))}
          </div>
          <span className="ml-3 text-sm text-gray-700">
            {debate.participants}+ participants
          </span>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="mt-4">
        <div className="flex justify-between text-xs font-semibold mb-1">
          <span className="text-green-600">{debate.agreePercent}% Agree</span>
          <span className="text-red-600">{debate.differPercent}% Differ</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded flex">
          <div
            className="bg-green-500 h-2 rounded-l"
            style={{ width: `${debate.agreePercent}%` }}
          ></div>
          <div
            className="bg-red-500 h-2 rounded-r"
            style={{ width: `${debate.differPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DebateCard;
