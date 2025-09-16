import React, { useState } from 'react';
import { UploadCloud, XCircle } from 'lucide-react'; // Import XCircle for the remove button

const FileUpload = ({ onFileChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFileName(file.name);
      onFileChange(file); // Pass the file up to the parent component
    } else {
      setPreviewUrl(null);
      setFileName('');
      onFileChange(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    // Revoke the object URL to free up memory
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFileName('');
    onFileChange(null); // Notify parent that file is removed
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-charcoalgrey mb-1">Plant Photo</label>

      {previewUrl ? (
        // Photo Preview Area
        <div className="bg-black max-w-4xl mt-2 relative rounded-lg border border-gray-300 overflow-hidden">
          <img src={previewUrl} alt="Plant Preview" className="w-full h-auto max-h-[600px] object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 text-charcoalgrey hover:text-territoryochre bg-white rounded-full p-1 shadow"
            aria-label="Remove photo"
          >
            <XCircle size={24} />
          </button>
          <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center truncate">
            {fileName}
          </p>
        </div>
      ) : (
        // Upload Area
        <div
          className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-TerritoryOchre focus-within:outline-none hover:text-red-500"
              >
                <span>Click to upload</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  accept="image/png, image/jpeg, image/webp"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, or WEBP up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;