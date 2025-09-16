// FilterBar.jsx
import React from 'react';
import { Search } from 'lucide-react'; // npm install lucide-react

const FilterBar = ({
  searchTerm,
  onSearchChange,
  plantFilter,
  onPlantFilterChange,
  statusFilter,
  onStatusFilterChange,
  plantTypes,
  statusTypes
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by plant name, diagnosis ..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-TerritoryOchre focus:border-TerritoryOchre"
        />
      </div>
      <select 
        value={plantFilter} 
        onChange={onPlantFilterChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-TerritoryOchre focus:border-TerritoryOchre"
      >
        {plantTypes.map(type => <option key={type} value={type}>{type}</option>)}
      </select>
      <select 
        value={statusFilter}
        onChange={onStatusFilterChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-TerritoryOchre focus:border-TerritoryOchre"
      >
        {statusTypes.map(type => <option key={type} value={type}>{type}</option>)}
      </select>
    </div>
  );
};

export default FilterBar;