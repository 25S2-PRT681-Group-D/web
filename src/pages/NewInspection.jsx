import React, { useState } from 'react';
import { FileUpload, TextInput, TextArea, SelectInput } from '../components';

const NewInspection = () => {
  const [formData, setFormData] = useState({
    plantName: '',
    inspectionDate: '',
    country: 'Australia',
    state: 'NT',
    city: 'Darwin',
    notes: '',
  });
  const [plantPhoto, setPlantPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    setPlantPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine file and form data for submission
    const submissionData = { ...formData, plantPhoto };
    console.log('Submitting for AI Analysis:', submissionData);
    // Add your API submission logic here
  };

  return (
      <div className="w-full mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Start New Inspection</h1>
          <p className="text-gray-500 mt-2">Upload a photo to get an instant AI-powered analysis.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FileUpload onFileChange={handleFileChange} />

          <TextInput
            label="Plant Name"
            name="plantName"
            value={formData.plantName}
            onChange={handleChange}
            placeholder="e.g., Tomato, Corn, etc."
          />

          <TextInput
            label="Inspection Date"
            name="inspectionDate"
            type="date"
            value={formData.inspectionDate}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectInput
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              options={['Australia']}
            />
            <SelectInput
              label="State / Province"
              name="state"
              value={formData.state}
              onChange={handleChange}
              options={['NT', 'WA', 'SA', 'QLD', 'NSW', 'VIC', 'TAS']}
            />
            <SelectInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              options={['Darwin', 'Perth', 'Adelaide', 'Brisbane', 'Sydney', 'Melbourne', 'Hobart']}
            />
          </div>

          <TextArea
            label="Notes (Optional)"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="e.g., Saw some yellowing on the lower leaves ..."
          />

          <div>
            <button
              type="submit"
              className="w-full bg-territoryochre text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-charcoalgrey/50 hover:-translate-y-2 transition duration-300"
            >
              Submit for AI Analysis
            </button>
          </div>
        </form>
      </div>
  );
};

export default NewInspection;