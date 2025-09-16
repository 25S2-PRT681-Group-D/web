import React from 'react';
import { ConfidenceBar, StatusPill, RecommendationItem } from '../components';

const AnalysisResult = () => {
  const analysisData = {
    plantName: 'Tomato Plant',
    inspectionDate: 'September 11, 2025',
    yourNotes: 'Saw some yellowing on the lower leaves and a few dark spots. Plant seems a bit weaker than the others in the same row.',
    diagnosis: 'Early Blight',
    status: 'At Risk',
    confidence: 92,
    description: "Early blight is a common fungal disease that affects tomatoes. It's caused by the fungus Alternaria solani and typically appears on older leaves first as small, dark lesions which can enlarge and form a 'bull's-eye' pattern.",
    recommendations: [
      'Remove & Destroy: Immediately prune and destroy affected lower leaves to prevent the fungus from spreading. Do not compost them.',
      'Improve Airflow: Ensure adequate spacing between plants to promote air circulation, which helps leaves dry faster and reduces fungal growth.',
      "Fungicide Application: Apply a fungicide containing copper or chlorothalonil, following the product's instructions carefully, especially on new growth.",
    ],
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg shadow-charcoalgrey/50">
      <h1 className="text-3xl font-bold text-center text-charcoalgrey mb-8">
        AI Analysis Complete
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 border-b border-charcoalgrey">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-territoryochre text-white flex items-center justify-center h-48 rounded-lg">
            <span className="text-2xl font-bold">Uploaded Plant</span>
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
        <button className="w-full md:w-auto flex-1 bg-territoryochre text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-charcoalgrey/50 hover:-translate-y-2 transition duration-300">
          View All Inspections
        </button>
        <button className="w-full md:w-auto flex-1 border border-arafurablue text-arafurablue font-bold py-3 px-6 rounded-lg shadow-lg shadow-charcoalgrey/50 hover:-translate-y-2 transition duration-300">
          Start New Inspection
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;