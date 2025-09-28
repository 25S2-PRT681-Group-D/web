import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { SummaryCard, Analytics, InspectionCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getMyInspections } from '../api/inspections.js'
import { toast } from 'react-toastify'
import { 
  fadeInVariants, 
  slideInLeftVariants, 
  slideInRightVariants, 
  staggerContainer,
  pageTransitionVariants 
} from '../utils/animations'

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
    <motion.div 
      className="w-full flex flex-col items-center justify-center gap-8"
      variants={pageTransitionVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      <motion.div 
        className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          variants={slideInLeftVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-territoryochre to-savannagreen rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h1 className='text-4xl lg:text-5xl text-charcoalgrey font-bold'>
                Welcome back, {user?.firstName || 'User'}!
              </h1>
              <p className="text-lg text-gray-600 mt-1">Ready to analyze your plants?</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          variants={slideInRightVariants}
          initial="hidden"
          animate="visible"
        >
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
        </motion.div>
      </motion.div>

      <motion.section 
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInVariants}>
          <SummaryCard 
            title="Total Inspections" 
            value={loading ? "..." : stats.totalInspections.toString()}
            icon="🔍"
          />
        </motion.div>
        <motion.div variants={fadeInVariants}>
          <SummaryCard 
            title="Healthy Results" 
            value={loading ? "..." : stats.healthyResults.toString()}
            icon="🌱"
          />
        </motion.div>
        <motion.div variants={fadeInVariants}>
          <SummaryCard 
            title="Last Inspection" 
            value={loading ? "..." : stats.lastInspection}
            icon="📅"
          />
        </motion.div>
      </motion.section>

      <motion.div
        className='w-full'
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <Analytics />
      </motion.div>

      <motion.section 
        className="w-full flex flex-col items-start gap-4"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <motion.div 
          className="w-full flex flex-row items-center justify-between"
          variants={slideInLeftVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className='text-3xl text-charcoalgrey font-semibold'>Recent Inspections</h2>
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/my-records"
              className='text-2xl text-arafurablue font-semibold text-shadow-lg text-shadow-charcoalgrey/25 hover:-translate-y-2 transition duration-300'
            >
              View All
            </Link>
          </motion.div>
        </motion.div>
        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            // Loading state
            <>
              <motion.div 
                className="w-full h-32 bg-gray-200 rounded-lg animate-pulse"
                variants={fadeInVariants}
              ></motion.div>
              <motion.div 
                className="w-full h-32 bg-gray-200 rounded-lg animate-pulse"
                variants={fadeInVariants}
              ></motion.div>
              <motion.div 
                className="w-full h-32 bg-gray-200 rounded-lg animate-pulse"
                variants={fadeInVariants}
              ></motion.div>
            </>
          ) : recentInspections.length > 0 ? (
            // Display recent inspections
            recentInspections.map((inspection, index) => (
              <motion.div
                key={inspection.id}
                variants={fadeInVariants}
                transition={{ delay: index * 0.1 }}
              >
                <InspectionCard
                  plantName={inspection.plantName}
                  date={inspection.date}
                  status={`AI: ${inspection.status}`}
                  statusType={inspection.statusType}
                  bgColor={inspection.bgColor}
                  inspectionId={inspection.id}
                />
              </motion.div>
            ))
          ) : (
            // No inspections state
            <motion.div 
              className="col-span-full text-center py-8"
              variants={fadeInVariants}
            >
              <p className="text-gray-500 text-lg">No inspections yet. Start your first inspection!</p>
            </motion.div>
          )}
        </motion.div>
      </motion.section>
    </motion.div>
  )
}

export default Dashboard