import React from "react";

const Int_Article = ({ article }) => {

  console.log(article)
  const content = (
    <div className="flex items-start bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <img
        src={article.image || "https://via.placeholder.com/96x96?text=News"}
        alt={article.title}
        className="w-24 h-24 object-cover"
      />
      <div className="p-3 flex flex-col justify-between">
        <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
          {article.title}
        </h3>
      </div>
    </div>
  );

  return article.url ? (
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};

export default Int_Article;
