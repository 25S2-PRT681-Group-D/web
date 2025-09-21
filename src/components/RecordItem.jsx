// RecordItem.jsx
import React from 'react';
import StatusPill from './StatusPill';

const RecordItem = ({ record }) => {
  const plantColor = {
    'Tomato': 'bg-territoryochre',
    'Corn': 'bg-savannagreen',
    'Bell Pepper': 'bg-arafurablue',
    'Wheat': 'bg-acaciagold',
    'Soybean': 'bg-savannagreen',
    'Lettuce': 'bg-territoryochre',
    'Carrot': 'bg-acaciagold',
    'Potato': 'bg-charcoalgrey',
    'Onion': 'bg-cloudwhite',
    'Cucumber': 'bg-arafurablue',
  }[record.plantName] || 'bg-cloudwhite';

  const getPlantIcon = (plantName) => {
    const icons = {
      'Tomato': '🍅',
      'Corn': '🌽',
      'Bell Pepper': '🫑',
      'Wheat': '🌾',
      'Soybean': '🫘',
      'Lettuce': '🥬',
      'Carrot': '🥕',
      'Potato': '🥔',
      'Onion': '🧅',
      'Cucumber': '🥒',
    };
    return icons[plantName] || '🌱';
  };

  return (
    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md shadow-charcoalgrey/50 hover:-translate-y-1 transition duration-300">
      <div className="flex items-center gap-4">
        <div className={`w-20 h-20 ${plantColor} text-white flex items-center justify-center rounded-lg`}>
          <span className="text-2xl">{getPlantIcon(record.plantName)}</span>
        </div>
        <div className="text-left">
          <h3 className="text-lg font-bold text-gray-800">{record.plantName}</h3>
          <p className="text-sm text-gray-500">Diagnosis: {record.diagnosis}</p>
          {record.location && (
            <p className="text-xs text-gray-400">📍 {record.location}</p>
          )}
          {record.confidence > 0 && (
            <p className="text-xs text-gray-400">Confidence: {record.confidence}%</p>
          )}
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