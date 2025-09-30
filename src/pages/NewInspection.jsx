import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { FileUpload, TextInput, TextArea, SelectInput } from '../components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createInspection, uploadInspectionImage } from '../api/inspections.js';
import { 
  pageTransitionVariants, 
  fadeInVariants, 
  staggerContainer,
  buttonPressVariants,
  shakeVariants 
} from '../utils/animations';

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    setPlantPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!plantPhoto) {
      setError('Please upload a plant photo.');
      toast.error('Please upload a plant photo.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        plantName: formData.plantName,
        inspectionDate: formData.inspectionDate ? new Date(formData.inspectionDate).toISOString() : new Date().toISOString(),
        country: formData.country,
        state: formData.state,
        city: formData.city,
        notes: formData.notes || null,
      };
      const created = await createInspection(payload);
      if (created?.id) {
        await uploadInspectionImage({ inspectionId: created.id, file: plantPhoto });
      }
      toast.success('Inspection submitted successfully!');
      // Redirect to analysis page with random dummy id
      const dummyId = Math.floor(Math.random() * 100000) + 1;
      navigate(`/analysis/${dummyId}`);
    } catch (err) {
      const errorMessage = err.message || 'Submission failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto card p-8 md:p-12"
      variants={pageTransitionVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      <motion.div 
        className="text-center mb-8"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1 className="text-3xl font-bold text-gray-800">
            Start New Inspection
          </motion.h1>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            className="text-3xl"
          >
            📸
          </motion.div>
        </motion.div>
        <motion.div 
          className="flex items-center justify-center gap-2 mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-gray-500">Upload a photo to get an instant plant health analysis.</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            className="text-2xl"
          >
            🤖
          </motion.span>
        </motion.div>
      </motion.div>

        {error && (
          <motion.p 
            className="text-red-600 mb-2"
            variants={shakeVariants}
            animate="animate"
          >
            {error}
          </motion.p>
        )}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInVariants}>
            <FileUpload onFileChange={handleFileChange} />
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <TextInput
              label="Plant Name"
              name="plantName"
              value={formData.plantName}
              onChange={handleChange}
              placeholder="e.g., Tomato, Corn, etc."
            />
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <TextInput
              label="Inspection Date"
              name="inspectionDate"
              type="date"
              value={formData.inspectionDate}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={fadeInVariants}
          >
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
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <TextArea
              label="Notes (Optional)"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g., Saw some yellowing on the lower leaves ..."
            />
          </motion.div>

          <motion.div variants={fadeInVariants}>
            <motion.button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              variants={buttonPressVariants}
              whileHover="hover"
              whileTap="press"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <span>🤖</span>
                  Submit for AI Analysis
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
    </motion.div>
  );
};

export default NewInspection;