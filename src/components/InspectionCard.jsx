import React from 'react';

function InspectionCard({ plantName, date, status, statusType, color }) {
  const statusClassName = statusType === 'healthy' ? 'text-savannagreen bg-savannagreen/10' : 'text-territoryochre bg-territoryochre/10';

  return (
    <div 
    className='bg-white w-full flex flex-col items-center rounded-lg shadow-lg shadow-charcoalgrey/50 hover:-translate-y-2 transition duration-300'
    onClick={() => {}}
    >
      <div className={`bg-${color} w-full h-[200px] flex items-center justify-center`}>
        <h3 className='text-4xl text-cloudwhite font-semibold'>{plantName}</h3>
      </div>
      <div className='w-full p-6 flex flex-col items-start justify-start gap-4'>
        <h3 className='text-3xl text-charcoalgrey font-semibold'>{plantName}</h3>
        <p className='text-base text-charcoalgrey font-medium'>{date}</p>
        <span className={`text-base font-bold px-2 py-1 rounded-lg ${statusClassName}`}>{status}</span>
      </div>
    </div>
  );
}

export default InspectionCard;