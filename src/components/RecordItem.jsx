// RecordItem.jsx
import React from 'react';
import StatusPill from './StatusPill';

const RecordItem = ({ record }) => {
  const plantColor = {
    'Tomato Plant': 'bg-territoryochre',
    'Corn Plant': 'bg-savannagreen',
    'Pepper Plant': 'bg-arafurablue',
  }[record.plantName] || 'bg-cloudwhite';

  return (
    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md shadow-charcoalgrey/50 hover:-translate-y-1 transition duration-300">
      <div className="flex items-center gap-4">
        <div className={`w-20 h-20 ${plantColor} text-white flex items-center justify-center rounded-lg`}>
          <span className="font-bold">Plant</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{record.plantName}</h3>
          <p className="text-sm text-gray-500">Diagnosis: {record.diagnosis}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">{record.date}</p>
        <StatusPill status={record.status}/>
      </div>
    </button>
  );
};

export default RecordItem;