import React from 'react';

const TextArea = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-600">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-TerritoryOchre focus:border-TerritoryOchre"
    />
  </div>
);

export default TextArea;