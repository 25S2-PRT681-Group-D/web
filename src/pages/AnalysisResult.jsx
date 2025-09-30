import React, { useState, useEffect } from 'react';
import { ConfidenceBar, StatusPill, RecommendationItem } from '../components';
import { useParams, useNavigate } from 'react-router-dom';
import { getInspectionById } from '../api/inspections.js';
import { toast } from 'react-toastify';

// Get the base URL from environment or use default
const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:5010/api';
const STATIC_BASE_URL = import.meta?.env?.VITE_STATIC_BASE_URL || 'http://localhost:5010';

const AnalysisResult = () => {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchInspectionData = async () => {
      try {
        setLoading(true);
        // For now, we'll use the analysisId as the inspection ID
        // In a real scenario, you'd have a mapping between analysis and inspection
        const inspectionData = await getInspectionById(analysisId);
        
        if (inspectionData) {
          setInspection(inspectionData);
          
          // Get the first image if available
          if (inspectionData.images && inspectionData.images.length > 0) {
            // Images are stored as filenames, construct the full URL
            console.log('Inspection images:', inspectionData.images);
            const imageFileName = inspectionData.images[0].image;
            if (imageFileName) {
              // Images are served as static files from wwwroot/images/inspections/
              const fullImageUrl = `${STATIC_BASE_URL}/images/inspections/${imageFileName}`;
              console.log('Constructed image URL:', fullImageUrl);
              setImageUrl(fullImageUrl);
              setImageError(false); // Reset error state when setting new URL
            } else {
              console.warn('No image filename found in inspection data');
              setImageError(true);
            }
          } else {
            console.log('No images found for this inspection');
          }
        }
      } catch (error) {
        toast.error('Failed to load inspection data');
        console.error('Error fetching inspection:', error);
        // Fallback to dummy data if API fails
        setInspection({
          plantName: 'Plant Sample',
          inspectionDate: new Date().toISOString(),
          notes: 'Auto-generated sample notes.',
          analysis: {
            status: 'Healthy',
            confidenceScore: 85,
            description: 'This is a randomly generated analysis description for demo purposes.',
            treatmentRecommendation: 'Continue monitoring the plant for any changes.'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInspectionData();
  }, [analysisId]);

  const analysisData = inspection ? {
    plantName: inspection.plantName,
    inspectionDate: new Date(inspection.inspectionDate).toLocaleDateString(),
    yourNotes: inspection.notes || 'No notes provided.',
    diagnosis: inspection.analysis?.status || 'Unknown',
    status: inspection.analysis?.status || 'Unknown',
    confidence: inspection.analysis?.confidenceScore || 0,
    description: inspection.analysis?.description || 'No description available.',
    recommendations: inspection.analysis?.treatmentRecommendation ? 
      [inspection.analysis.treatmentRecommendation] : 
      ['Continue monitoring the plant for any changes.']
  } : null;

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg shadow-charcoalgrey/50">
        <div className="text-center py-10">
          <div className="text-lg text-gray-500">Loading analysis results...</div>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="w-full max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg shadow-charcoalgrey/50">
        <div className="text-center py-10">
          <div className="text-lg text-gray-500">No analysis data available.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg shadow-charcoalgrey/50">
      <h1 className="text-3xl font-bold text-center text-charcoalgrey mb-8">
        AI Analysis Complete
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 border-b border-charcoalgrey">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="h-48 rounded-lg overflow-hidden">
            {imageUrl && !imageError ? (
              <img 
                src={imageUrl} 
                alt="Uploaded plant" 
                className="w-full h-full object-cover"
                onError={() => {
                  console.error('Failed to load image:', imageUrl);
                  setImageError(true);
                }}
              />
            ) : (
              <div className="bg-territoryochre text-white flex items-center justify-center h-full">
                <span className="text-2xl font-bold">
                  {imageError ? 'Image Load Failed' : 'No Image Available'}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-charcoalgrey">{analysisData.plantName}</h3>
            <p className="text-sm text-gray-500">
              Inspection Date: {analysisData.inspectionDate}
            </p>
          </div>
          <div className="bg-acaciagold/15 border-l-4 border-acaciagold p-4 rounded-lg">
            <h4 className="font-semibold text-charcoalgrey">Your Notes:</h4>
            <p className="text-sm text-gray-600 mt-1">{analysisData.yourNotes}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-charcoalgrey">Diagnosis: {analysisData.diagnosis}</h2>
            <StatusPill status={analysisData.status} />
          </div>

          <hr />

          <div>
            <h3 className="font-semibold text-black mb-2">Confidence Score</h3>
            <ConfidenceBar value={analysisData.confidence} />
          </div>

          <div>
            <h3 className="font-semibold text-black">Description</h3>
            <p className="text-gray-600 mt-1">{analysisData.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-black">Treatment Recommendations</h3>
            <div className="space-y-4 mt-2">
              {analysisData.recommendations.map((text, index) => (
                <RecommendationItem key={index} number={index + 1} text={text} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col md:flex-row gap-4">
        <button 
          onClick={() => navigate('/my-records')}
          className="w-full md:w-auto flex-1 bg-territoryochre text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-charcoalgrey/50 hover:-translate-y-2 transition duration-300"
        >
          View All Inspections
        </button>
        <button 
          onClick={() => navigate('/new-inspection')}
          className="w-full md:w-auto flex-1 border border-arafurablue text-arafurablue font-bold py-3 px-6 rounded-lg shadow-lg shadow-charcoalgrey/50 hover:-translate-y-2 transition duration-300"
        >
          Start New Inspection
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;