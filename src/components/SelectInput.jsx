import React from 'react';

const SelectInput = ({ label, name, value, onChange, options }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-600">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-TerritoryOchre focus:border-TerritoryOchre"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;