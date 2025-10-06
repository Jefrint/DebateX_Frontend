import React from "react";

const PastDebates = () => {
  const debate = {
    question: "കേരളത്തിലെ വികസനനയങ്ങളിൽ സർക്കാർ ചില മാറ്റങ്ങൾ വേണമോ?",
    agree: 80,
    differ: 20,
    date: "March 22, 2024",
    time: "4:00 PM - 8:00 PM",
    category: "Politics and Governance",
  };

  return (
    <div className="px-6 py-10 flex justify-center">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
        

        {/* Debate Question */}
        <h3 className="text-base font-medium mb-3 text-gray-800">
          {debate.question}
        </h3>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span className="text-green-600">{debate.agree}% Agree</span>
            <span className="text-red-600">{debate.differ}% Differ</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full flex">
            <div
              className="h-2 bg-green-500 rounded-l-full"
              style={{ width: `${debate.agree}%` }}
            ></div>
            <div
              className="h-2 bg-red-500 rounded-r-full"
              style={{ width: `${debate.differ}%` }}
            ></div>
          </div>
        </div>

        {/* Date and Time */}
        <p className="text-xs text-gray-500">
          {debate.date}, {debate.time}
        </p>
      </div>
    </div>
  );
};

export default PastDebates;
