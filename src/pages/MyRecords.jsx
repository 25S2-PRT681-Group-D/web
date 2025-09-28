import React, { useState, useMemo, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { FilterBar, RecordItem } from '../components';
import { getMyInspections } from '../api/inspections.js';
import { toast } from 'react-toastify';
import { 
  pageTransitionVariants, 
  fadeInVariants, 
  staggerContainer,
  pulseVariants 
} from '../utils/animations';
import { useNavigate } from 'react-router-dom';

const MyRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [plantFilter, setPlantFilter] = useState('All Plants');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 10;
  const navigate = useNavigate();
  // Fetch user's inspection records
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const data = await getMyInspections();
        
        // Transform API data to match component format
        const transformedRecords = data.map(inspection => ({
          id: inspection.id,
          plantName: inspection.plantName,
          diagnosis: inspection.analysis?.status || 'Unknown',
          date: new Date(inspection.inspectionDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          status: inspection.analysis?.status || 'Unknown',
          confidence: inspection.analysis?.confidenceScore || 0,
          location: `${inspection.city}, ${inspection.state}`,
          notes: inspection.notes,
          createdAt: inspection.createdAt
        }));
        
        setRecords(transformedRecords);
      } catch (error) {
        toast.error('Failed to load inspection records');
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // useMemo will re-calculate the filtered records only when dependencies change
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        record.plantName.toLowerCase().includes(searchTermLower) ||
        record.diagnosis.toLowerCase().includes(searchTermLower) ||
        record.location.toLowerCase().includes(searchTermLower);

      const matchesPlant =
        plantFilter === 'All Plants' || record.plantName.includes(plantFilter.replace(' Plant', ''));

      const matchesStatus =
        statusFilter === 'All Statuses' || record.status === statusFilter;

      return matchesSearch && matchesPlant && matchesStatus;
    });
  }, [records, searchTerm, plantFilter, statusFilter]);

  // Pagination logic
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filteredRecords.slice(startIndex, endIndex);
  }, [filteredRecords, currentPage, recordsPerPage]);

  // Update total pages when filtered records change
  useEffect(() => {
    const totalFilteredRecords = filteredRecords.length;
    const newTotalPages = Math.ceil(totalFilteredRecords / recordsPerPage);
    setTotalPages(newTotalPages);
    setTotalRecords(totalFilteredRecords);
    
    // Reset to page 1 if current page is greater than total pages
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredRecords, currentPage, recordsPerPage]);

  // Get unique plant types from the data
  const plantTypes = useMemo(() => {
    const uniquePlants = [...new Set(records.map(record => record.plantName))];
    return ['All Plants', ...uniquePlants];
  }, [records]);

  // Get unique status types from the data
  const statusTypes = useMemo(() => {
    const uniqueStatuses = [...new Set(records.map(record => record.status))];
    return ['All Statuses', ...uniqueStatuses];
  }, [records]);

  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-200"
      variants={pageTransitionVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      <motion.div 
        className="flex items-center gap-3 mb-8"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          My Records
        </h1>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="text-3xl"
        >
          📋
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          className="text-2xl"
        >
          🌾
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          plantFilter={plantFilter}
          onPlantFilterChange={(e) => setPlantFilter(e.target.value)}
          statusFilter={statusFilter}
          onStatusFilterChange={(e) => setStatusFilter(e.target.value)}
          plantTypes={plantTypes}
          statusTypes={statusTypes}
        />
      </motion.div>

      <motion.div 
        className="mt-8 space-y-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <motion.div 
            className="text-center py-10"
            variants={pulseVariants}
            animate="animate"
          >
            <div className="text-lg text-gray-500">Loading your inspection records...</div>
          </motion.div>
        ) : paginatedRecords.length > 0 ? (
          paginatedRecords.map((record, index) => (
            <motion.div
              key={record.id}
              variants={fadeInVariants}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/analysis/${record.id}`)}  
            >
              <RecordItem record={record} />
            </motion.div>
          ))
        ) : (
          <motion.p 
            className="text-center text-gray-500 py-10"
            variants={fadeInVariants}
          >
            No records found.
          </motion.p>
        )}
      </motion.div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <motion.div 
          className="mt-8 flex items-center justify-between"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="text-sm text-gray-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, totalRecords)} of {totalRecords} records
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <motion.button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === pageNum
                        ? 'bg-territoryochre text-white'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {pageNum}
                  </motion.button>
                );
              })}
            </div>
            
            <motion.button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyRecords;