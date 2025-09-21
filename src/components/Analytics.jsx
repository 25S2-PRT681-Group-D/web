import React, { useMemo, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
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
    // Data is already filtered by the API call, so we just return rawData
    return rawData;
  }, [rawData]);

  const columnHelper = createColumnHelper();
  const columns = useMemo(() => [
    columnHelper.accessor('date', { header: 'Date', cell: info => info.getValue() }),
    columnHelper.accessor('plant', { header: 'Plant', cell: info => info.getValue() }),
    columnHelper.accessor('status', { header: 'Status', cell: info => info.getValue() }),
  ], [columnHelper]);

  const tableInstance = useReactTable({ data: tableData, columns, getCoreRowModel: getCoreRowModel() });

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
              <div className="w-full">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    {tableInstance.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id} className="px-4 py-2 border-b">
                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {tableInstance.getRowModel().rows.map(row => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-4 py-2 border-b">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
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