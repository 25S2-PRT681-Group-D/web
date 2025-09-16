// RecommendationItem.jsx
import React from 'react';

const RecommendationItem = ({ number, text }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-6 h-6 bg-acaciagold text-yellow-800 text-sm font-bold flex items-center justify-center rounded-full">
      {number}
    </div>
    <p className="text-charcoalgrey">{text}</p>
  </div>
);

export default RecommendationItem;