import React from "react";

const event = {
  title: "യുവതിയില്‍ ക്രിപ്റ്റോ ബുബിള്‍ ഉപയോഗിക്കാമോ?",
  category: "Technology",
  description:
    "ഡിജിറ്റല്‍ ആപ്ലിക്കേഷനില്‍ ക്രിപ്റ്റോ ബുബിള്‍ ഉപയോഗിക്കുന്നതിന് പുതിയ ട്രെന്‍ഡുകള്‍, സാങ്കേതികവിദ്യകള്‍, സാധ്യതകള്‍, ഭാവി സാധ്യതകള്‍ എന്നിവ ചര്‍ച്ച ചെയ്യും.",
  dateTime: "March 22, 2024, 4:00 PM IST",
  countdown: "2 Days Left",
};

const Up_Debates = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 p-6">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {event.title}
      </h2>

      {/* Category */}
      <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-600 font-medium mb-4">
        {event.category}
      </span>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {event.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between text-sm text-gray-700 border-t pt-4">
        <div>
          <p className="font-medium">Date & Time</p>
          <p className="text-gray-500">{event.dateTime}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">Countdown Timer</p>
          <p className="text-gray-500">{event.countdown}</p>
        </div>
      </div>
    </div>
  );
};

export default Up_Debates;
