import React, { useMemo, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { getInspectionsWithFilters } from '../api/inspections.js';
import { toast } from 'react-toastify';

function Analytics() {
  const charts = ['Table', 'Line Chart', 'Pie Chart', 'Bar Chart'];

  const [activeView, setActiveView] = useState('Table');
  const [showSummary, setShowSummary] = useState(false);
  const [showAdvise, setShowAdvise] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('All');
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plantTypes, setPlantTypes] = useState(['All']);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getInspectionsWithFilters(
          selectedPlant === 'All' ? null : selectedPlant,
          null,
          startDate || null,
          endDate || null
        );
        
        // Sort data by inspection date DESC (newest first)
        const sortedData = data.sort((a, b) => 
          new Date(b.inspectionDate) - new Date(a.inspectionDate)
        );
        
        // Transform API data to match our format
        const transformedData = sortedData.map(inspection => ({
          date: inspection.inspectionDate.split('T')[0], // Extract date part
          plant: inspection.plantName,
          status: inspection.analysis?.status || 'Unknown',
          id: inspection.id,
          country: inspection.country,
          city: inspection.city,
          notes: inspection.notes,
          inspectionDate: inspection.inspectionDate,
          confidence: inspection.analysis?.confidenceScore || 0
        }));
        
        setRawData(transformedData);
        
        // Extract unique plant types from the data
        const uniquePlants = [...new Set(sortedData.map(inspection => inspection.plantName))];
        setPlantTypes(['All', ...uniquePlants]);
      } catch (error) {
        toast.error('Failed to load analytics data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPlant, startDate, endDate]);

  const tableData = useMemo(() => {
    let filteredData = rawData;

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(item => 
        item.plant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortField === 'confidence') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filteredData;
  }, [rawData, searchTerm, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return tableData.slice(startIndex, startIndex + itemsPerPage);
  }, [tableData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Kendo UI DataGrid doesn't need column definitions like react-table

  const lineData = useMemo(() => {
    // Group filtered data by day and count healthy vs issues
    const grouped = tableData.reduce((acc, item) => {
      const day = new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' });
      if (!acc[day]) {
        acc[day] = { name: day, Healthy: 0, Issues: 0 };
      }
      if (item.status === 'Healthy') {
        acc[day].Healthy += 1;
      } else {
        acc[day].Issues += 1;
      }
      return acc;
    }, {});
    
    return Object.values(grouped);
  }, [tableData]);

  const pieData = useMemo(() => {
    // Count statuses from filtered data
    const statusCounts = tableData.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, [tableData]);

  const barData = lineData;
  
  // Define colors with proper mapping for status types
  const getStatusColor = (status) => {
    switch (status) {
      case 'Healthy': return '#34a853'; // Green
      case 'At Risk': return '#ffa500'; // Yellow
      case 'Alert': return '#fbbc05'; // Yellow
      case 'Diseased': return '#ea4335'; // Red
      default: return '#6b7280'; // Gray
    }
  };

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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className='min-w-[180px]'>
          <label htmlFor="plant" className="block text-sm font-semibold text-charcoalgrey mb-1">
            Plant
          </label>
          <select
            id="plant"
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-charcoalgrey"
          >
            {plantTypes.map(plant => (
              <option key={plant} value={plant}>
                {plant === 'All' ? 'All Plants' : plant}
              </option>
            ))}
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

      <div className="bg-cloudwhite w-full aspect-2/1 rounded-lg p-4 flex items-center justify-center overflow-auto">
        {loading ? (
          <div className="text-center">
            <div className="text-lg text-charcoalgrey">Loading analytics data...</div>
          </div>
        ) : (
          <>
            {activeView === 'Table' && (
              <div className="w-full overflow-hidden" style={{ height: '70vh' }}>
                {/* Table Controls */}
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        Showing {tableData.length} inspection{tableData.length !== 1 ? 's' : ''}
                      </span>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-500">Show:</label>
                        <select 
                          value={itemsPerPage} 
                          onChange={(e) => setItemsPerPage(Number(e.target.value))}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Search inspections..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 w-64"
                      />
                    </div>
                  </div>
                </div>
                <div className="overflow-auto h-full">
                  <table className="w-full border-collapse min-w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th 
                        className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => handleSort('date')}
                      >
                        <div className="flex items-center gap-1">
                          Date
                          {sortField === 'date' && (
                            <span className="text-xs">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => handleSort('plant')}
                      >
                        <div className="flex items-center gap-1">
                          Plant
                          {sortField === 'plant' && (
                            <span className="text-xs">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center gap-1">
                          Status
                          {sortField === 'status' && (
                            <span className="text-xs">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => handleSort('country')}
                      >
                        <div className="flex items-center gap-1">
                          Country
                          {sortField === 'country' && (
                            <span className="text-xs">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => handleSort('city')}
                      >
                        <div className="flex items-center gap-1">
                          City
                          {sortField === 'city' && (
                            <span className="text-xs">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => handleSort('confidence')}
                      >
                        <div className="flex items-center gap-1">
                          Confidence
                          {sortField === 'confidence' && (
                            <span className="text-xs">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr key={item.id || index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{item.date}</td>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{item.plant}</td>
                        <td className="border border-gray-200 px-4 py-3 text-sm">
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              item.status === 'Healthy' 
                                ? 'bg-green-100 text-green-800' 
                                : item.status === 'At Risk' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : item.status === 'Alert'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{item.country}</td>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{item.city}</td>
                        <td className="border border-gray-200 px-4 py-3 text-sm w-32">
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-blue-600 h-2 rounded-full max-w-full" 
                                style={{ width: `${Math.min(item.confidence * 100, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 whitespace-nowrap">
                              {Math.round(item.confidence)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  </table>
                </div>
                
                {/* Pagination Controls */}
                <div className="bg-gray-50 px-4 py-3 border-t flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, tableData.length)} of {tableData.length} results
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                        if (pageNum > totalPages) return null;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-1 text-sm border rounded ${
                              currentPage === pageNum 
                                ? 'bg-blue-500 text-white border-blue-500' 
                                : 'border-gray-300 hover:bg-gray-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'Line Chart' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Healthy" stroke="#34a853" strokeWidth={2} />
                  <Line type="monotone" dataKey="Issues" stroke="#ea4335" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeView === 'Pie Chart' && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={120} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getStatusColor(entry.name)} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}

            {activeView === 'Bar Chart' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Healthy" fill="#34a853" />
                  <Bar dataKey="Issues" fill="#ea4335" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </>
        )}
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