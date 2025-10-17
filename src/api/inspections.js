import { apiRequest } from './client.js';

export async function createInspection(payload) {
	// payload: { plantName, inspectionDate, country, state, city, notes }
	return await apiRequest('/inspections', {
		method: 'POST',
		body: payload,
	});
}

export async function uploadInspectionImage({ inspectionId, file }) {
	const form = new FormData();
	form.append('InspectionId', inspectionId);
	form.append('ImageFile', file);
	return await apiRequest('/images/upload', {
		method: 'POST',
		body: form,
		isFormData: true,
	});
}

export async function uploadMultipleInspectionImages({ inspectionId, files }) {
	const form = new FormData();
	form.append('InspectionId', inspectionId);
	
	// Append each file to the form data
	files.forEach((file) => {
		form.append('ImageFiles', file);
	});
	
	return await apiRequest('/images/upload-multiple', {
		method: 'POST',
		body: form,
		isFormData: true,
	});
}

export async function getMyInspections() {
  return await apiRequest('/inspections/my-inspections');
}

export async function getInspectionById(id) {
  return await apiRequest(`/inspections/${id}`);
}

export async function getInspectionsWithFilters(plantName, status, startDate, endDate) {
  const params = new URLSearchParams();
  if (plantName) params.append('plantName', plantName);
  if (status) params.append('status', status);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  return await apiRequest(`/inspections?${params.toString()}`);
}

export async function createInspectionAnalysis(payload) {
	return await apiRequest('/inspectionanalysis', {
		method: 'POST',
		body: payload,
	});
}
