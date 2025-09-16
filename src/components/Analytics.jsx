import React, { useState } from 'react';

function Analytics() {
  const charts = ['Table', 'Line Chart', 'Pie Chart', 'Bar Chart', 'Heat Map'];

  const [activeView, setActiveView] = useState('Table');
  const [showSummary, setShowSummary] = useState(false);
  const [showAdvise, setShowAdvise] = useState(false);

  return (
    <section className="bg-white w-full px-8 py-16 flex flex-col items-start gap-4 rounded-lg shadow-lg shadow-charcoalgrey/50">
      <h2 className='text-3xl text-charcoalgrey font-semibold'>Inspections Analytics</h2>
      <div className="flex flex-row items-center gap-2">
        <div className='min-w-[180px]'>
          <label htmlFor="start-date" className="block text-sm font-semibold text-charcoalgrey mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className='min-w-[180px]'>
          <label htmlFor="end-date" className="block text-sm font-semibold text-charcoalgrey mb-1">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className='min-w-[180px]'>
          <label htmlFor="plant" className="block text-sm font-semibold text-charcoalgrey mb-1">
            Plant
          </label>
          <select
            id="plant"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-charcoalgrey"
          >
            <option value={'All'}>All Plants</option>
            <option>Tomato</option>
            <option>Corn Stalk</option>
            <option>Bell Pepper</option>
          </select>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4">
        {charts.map(item => (
          <button
            onClick={() => setActiveView(item)}
            className={`rounded-lg shadow-lg shadow-charcoalgrey/50 px-4 py-2 transition duration-300 ${activeView === item ? 'bg-savannagreen text-white' : 'bg-cloudwhite text-charcoalgrey'}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="bg-cloudwhite w-full aspect-2/1 rounded-lg p-4 flex items-center justify-center">
        {activeView === 'Table' && <div>Table View Placeholder</div>}
        {activeView === 'Line Chart' && <div>Line Chart Placeholder</div>}
      </div>

      <div className="w-full flex flex-col items-start gap-4">
        <div className='flex flex-row items-center gap-2'>
          <button
            onClick={() => setShowSummary(!showSummary)}
            className='bg-arafurablue text-white font-semibold rounded-lg px-4 py-2 shadow-lg shadow-charcoalgrey/50 hover:-translate-y-2 transition duration-300'
          >
            Toggle AI Summary
          </button>
          <button
            onClick={() => setShowAdvise(!showAdvise)}
            className='bg-arafurablue text-white font-semibold rounded-lg px-4 py-2 shadow-lg shadow-charcoalgrey/50 hover:-translate-y-2 transition duration-300'
          >
            Toggle AI Advice
          </button>
        </div>
        <div className={`bg-arafurablue/20 p-4 flex-col items-start gap-2 rounded-lg border-l-4 border-arafurablue ${showSummary ? 'flex opacity-100' : 'hidden opacity-0'} transition duration-300`}>
          <h3 className='text-2xl text-arafurablue font-semibold'>AI Summary</h3>
          <p className='text-lg text-charcoalgrey'>Based on the selected data, your tomato plants show a 15% increase in 'Early Blight' detections this week, while corn remains consistently healthy. Overall, 80% of your recent inspections are rated 'Healthy'.</p>
        </div>
      </div>
    </section>
  );
}

export default Analytics;