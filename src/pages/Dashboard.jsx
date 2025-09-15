import React from 'react'
import { SummaryCard, Analytics, InspectionCard } from '../components'

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className='text-5xl text-charcoalgrey font-semibold'>Welcome back, Jane!</h1>
        <button
          className="bg-territoryochre text-cloudwhite text-xl font-semibold px-4 py-2 rounded-lg shadow-lg shadow-charcoalgrey/50 hover:-translate-y-2 transition duration-300"
        >
          Start New Inspection
        </button>
      </div>

      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Total Inspections" value="24" />
        <SummaryCard title="Healthy Results" value="19" />
        <SummaryCard title="Last Inspection" value="September 9, 2025" />
      </section>

      <Analytics />

      <section className="w-full flex flex-col items-start gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className='text-3xl text-charcoalgrey font-semibold'>Recent Inspections</h2>
          <a
            href="#"
            className='text-2xl text-arafurablue font-semibold text-shadow-lg text-shadow-charcoalgrey/25 hover:-translate-y-2 transition duration-300'
          >
            View All
          </a>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <InspectionCard
            plantName="Tomato Plant"
            date="Sep 9, 2025"
            status="AI: Early Blight"
            statusType="alert"
            color="savannagreen"
          />
          <InspectionCard
            plantName="Corn Stalk"
            date="Sep 9, 2025"
            status="AI: Healthy"
            statusType="healthy"
            color="acaciagold"
          />
          <InspectionCard
            plantName="Bell Pepper"
            date="Sep 9, 2025"
            status="AI: Healthy"
            statusType="healthy"
            color="territoryochre"
          />
        </div>
      </section>
    </div>
  )
}

export default Dashboard