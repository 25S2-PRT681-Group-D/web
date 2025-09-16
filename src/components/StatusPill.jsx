// StatusPill.jsx
import React from 'react';

const StatusPill = ({ status }) => {
  const isHealthy = status === 'Healthy';
  const statusColor = isHealthy ? 'text-savannagreen bg-savannagreen/15' : 'text-territoryochre bg-territoryochre/15';
  return (
    <div className="inline-block mt-2">
    <span className={`text-sm font-semibold ${statusColor} px-3 py-1 rounded-full`}>
      {status}
    </span>
  </div>
  )
};

export default StatusPill;