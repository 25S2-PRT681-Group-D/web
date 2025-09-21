import React, { useState, useMemo, useEffect } from 'react';
import { FilterBar, RecordItem } from '../components';
import { getMyInspections } from '../api/inspections.js';
import { toast } from 'react-toastify';

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
    <div className="w-full max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        My Records
      </h1>

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

      <div className="mt-8 space-y-4">
        {loading ? (
          <div className="text-center py-10">
            <div className="text-lg text-gray-500">Loading your inspection records...</div>
          </div>
        ) : paginatedRecords.length > 0 ? (
          paginatedRecords.map((record) => (
            <RecordItem key={record.id} record={record} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">No records found.</p>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, totalRecords)} of {totalRecords} records
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
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
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === pageNum
                        ? 'bg-territoryochre text-white'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecords;