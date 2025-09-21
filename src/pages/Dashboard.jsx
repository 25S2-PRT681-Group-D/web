import React, { useState, useEffect } from 'react'
import { SummaryCard, Analytics, InspectionCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getMyInspections } from '../api/inspections.js'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const [inspections, setInspections] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalInspections: 0,
    healthyResults: 0,
    lastInspection: 'No inspections yet'
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const data = await getMyInspections()
        
        // Transform data for display
        const transformedInspections = data.map(inspection => ({
          id: inspection.id,
          plantName: inspection.plantName,
          date: new Date(inspection.inspectionDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          status: inspection.analysis?.status || 'Unknown',
          statusType: getStatusType(inspection.analysis?.status),
          bgColor: getPlantColor(inspection.plantName)
        }))
        
        setInspections(transformedInspections)
        
        // Calculate stats
        const totalInspections = data.length
        const healthyResults = data.filter(inspection => 
          inspection.analysis?.status === 'Healthy'
        ).length
        
        const lastInspection = data.length > 0 
          ? new Date(data[0].inspectionDate).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })
          : 'No inspections yet'
        
        setStats({
          totalInspections,
          healthyResults,
          lastInspection
        })
        
      } catch (error) {
        toast.error('Failed to load dashboard data')
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getStatusType = (status) => {
    switch (status) {
      case 'Healthy': return 'healthy'
      case 'At Risk': return 'alert'
      case 'Alert': return 'alert'
      case 'Diseased': return 'diseased'
      default: return 'unknown'
    }
  }

  const getPlantColor = (plantName) => {
    const colors = {
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
    }
    return colors[plantName] || 'bg-cloudwhite'
  }

  const recentInspections = inspections.slice(0, 3)

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className='text-5xl text-charcoalgrey font-semibold'>
          Welcome back, {user?.firstName || 'User'}!
        </h1>
        <Link
          to="/new-inspection"
          className="bg-territoryochre text-cloudwhite text-xl font-semibold px-4 py-2 rounded-lg shadow-lg shadow-charcoalgrey/50 hover:-translate-y-2 transition duration-300"
        >
          Start New Inspection
        </Link>
      </div>

      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard 
          title="Total Inspections" 
          value={loading ? "..." : stats.totalInspections.toString()} 
        />
        <SummaryCard 
          title="Healthy Results" 
          value={loading ? "..." : stats.healthyResults.toString()} 
        />
        <SummaryCard 
          title="Last Inspection" 
          value={loading ? "..." : stats.lastInspection} 
        />
      </section>

      <Analytics />

      <section className="w-full flex flex-col items-start gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className='text-3xl text-charcoalgrey font-semibold'>Recent Inspections</h2>
          <Link
            to="/my-records"
            className='text-2xl text-arafurablue font-semibold text-shadow-lg text-shadow-charcoalgrey/25 hover:-translate-y-2 transition duration-300'
          >
            View All
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            // Loading state
            <>
              <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            </>
          ) : recentInspections.length > 0 ? (
            // Display recent inspections
            recentInspections.map((inspection) => (
              <InspectionCard
                key={inspection.id}
                plantName={inspection.plantName}
                date={inspection.date}
                status={`AI: ${inspection.status}`}
                statusType={inspection.statusType}
                bgColor={inspection.bgColor}
              />
            ))
          ) : (
            // No inspections state
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 text-lg">No inspections yet. Start your first inspection!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Dashboard