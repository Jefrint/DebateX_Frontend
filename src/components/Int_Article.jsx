import React from "react";

const Int_Article = ({ article }) => {
  return (
    <div className="  flex items-start bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Image */}
      <img
        src={article.image}
        alt={article.title}
        className="w-24 h-24 object-cover"
      />

      {/* Content */}
      <div className="p-3 flex flex-col justify-between">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
          {article.title}
        </h3>

        {/* Interest count */}
        <p className="text-xs text-gray-500 mt-2">
          {article.interestedCount} people have shown interest.
        </p>
      </div>
    </div>
  );
};

export default Int_Article;
