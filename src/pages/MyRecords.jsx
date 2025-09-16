import React, { useState, useMemo } from 'react';
import { FilterBar, RecordItem } from '../components';

// In a real app, this data would be fetched from an API
const allRecords = [
  {
    id: 1,
    plantName: 'Tomato Plant',
    diagnosis: 'Early Blight',
    date: 'Sep 11, 2025',
    status: 'At Risk',
  },
  {
    id: 2,
    plantName: 'Corn Plant',
    diagnosis: 'Healthy',
    date: 'Sep 11, 2025',
    status: 'Healthy',
  },
  {
    id: 3,
    plantName: 'Pepper Plant',
    diagnosis: 'Bacterial Spot',
    date: 'Sep 11, 2025',
    status: 'At Risk',
  },
  {
    id: 4,
    plantName: 'Tomato Plant',
    diagnosis: 'Healthy',
    date: 'Sep 11, 2025',
    status: 'Healthy',
  },
];

const MyRecords = () => {
  const [records, setRecords] = useState(allRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [plantFilter, setPlantFilter] = useState('All Plants');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // useMemo will re-calculate the filtered records only when dependencies change
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        record.plantName.toLowerCase().includes(searchTermLower) ||
        record.diagnosis.toLowerCase().includes(searchTermLower);

      const matchesPlant =
        plantFilter === 'All Plants' || record.plantName.includes(plantFilter.replace(' Plant', ''));

      const matchesStatus =
        statusFilter === 'All Statuses' || record.status === statusFilter;

      return matchesSearch && matchesPlant && matchesStatus;
    });
  }, [records, searchTerm, plantFilter, statusFilter]);

  const plantTypes = ['All Plants', 'Tomato Plant', 'Corn Plant', 'Pepper Plant'];
  const statusTypes = ['All Statuses', 'Healthy', 'At Risk'];

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
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <RecordItem key={record.id} record={record} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">No records found.</p>
        )}
      </div>
    </div>
  );
};

export default MyRecords;