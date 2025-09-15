import React from 'react';

function SummaryCard({ title, value }) {
  return (
    <div className='bg-white w-full p-8 flex flex-col items-start justify-start gap-4 rounded-lg shadow-lg shadow-charcoalgrey/50'>
      <p className='text-charcoalgrey text-2xl font-bold'>{title}</p>
      <p className='text-savannagreen text-3xl font-semibold'>{value}</p>
    </div>
  );
}

export default SummaryCard;