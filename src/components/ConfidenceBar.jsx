// ConfidenceBar.jsx
import React from 'react';

const ConfidenceBar = ({ value }) => (
  <div className="flex items-center gap-4">
    <span className="font-bold text-lg text-savannagreen">{value}%</span>
    <div className="w-full bg-cloudwhite rounded-full h-4">
      <div
        className="bg-savannagreen h-4 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

export default ConfidenceBar;