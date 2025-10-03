import React from 'react'

const Int_Article = () => {
    const event = {
        image:
          "https://via.placeholder.com/80", 
        title:
          "ഭാരതപഥ നിര്‍മ്മാണം: ആഗസ്റ്റ് മാസത്തിനുള്ളില്‍ പൂര്‍ത്തിയാകും, എറണാകുളത്ത് വ്യാപക നിര്‍മ്മാണം",
        interestCount: 985,
      };
    
      return (
        <div className="max-w-sm mx-auto flex items-start bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          {/* Image */}
          <img
            src={event.image}
            alt="Event"
            className="w-24 h-24 object-cover"
          />
    
          {/* Content */}
          <div className="p-3 flex flex-col justify-between">
            {/* Title */}
            <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
              {event.title}
            </h3>
    
            {/* Interest count */}
            <p className="text-xs text-gray-500 mt-2">
              {event.interestCount} people have shown interest.
            </p>
          </div>
        </div>
      );
}

export default Int_Article