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
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-br from-savannagreen/10 to-arafurablue/10 rounded-2xl p-8">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-territoryochre to-savannagreen rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <h1 className='text-4xl lg:text-5xl text-charcoalgrey font-bold'>
                  Welcome back, {user?.firstName || 'User'}!
                </h1>
                <p className="text-lg text-gray-600 mt-1">Ready to analyze your plants with AI?</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/new-inspection"
              className="btn-primary text-center flex items-center justify-center gap-2"
            >
              <span>📸</span>
              Start New Inspection
            </Link>
            <Link
              to="/my-records"
              className="btn-secondary text-center flex items-center justify-center gap-2"
            >
              <span>📊</span>
              View Records
            </Link>
          </div>
        </div>
        </div>

        {/* Stats Section */}
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard 
          title="Total Inspections" 
          value={loading ? "..." : stats.totalInspections.toString()}
          icon="🔍"
        />
        <SummaryCard 
          title="Healthy Results" 
          value={loading ? "..." : stats.healthyResults.toString()}
          icon="🌱"
        />
        <SummaryCard 
          title="Last Inspection" 
          value={loading ? "..." : stats.lastInspection}
          icon="📅"
        />
      </section>

      {/* Analytics Section */}
      <div className='w-full'>
        <Analytics />
      </div>

      {/* Recent Inspections Section */}
      <section className="w-full flex flex-col items-start gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className='text-3xl text-charcoalgrey font-semibold'>Recent Inspections</h2>
          <Link
            to="/my-records"
            className='text-2xl text-arafurablue font-semibold hover:text-arafurablue/80 transition duration-300'
          >
            View All →
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
                inspectionId={inspection.id}
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
    </div>
  )
}

export default Dashboard