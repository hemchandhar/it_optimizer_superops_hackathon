import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Analytics
export const getDashboardSummary = () => api.get('/analytics/dashboard');
export const getRecommendations = () => api.get('/analytics/recommendations');

// Licenses
export const getLicenses = () => api.get('/licenses');
export const getLicenseAnalytics = () => api.get('/licenses/analytics');
export const getLicenseOptimization = () => api.get('/licenses/optimization');
export const getUnderutilizedLicenses = () => api.get('/licenses/underutilized');

// Workflows
export const getWorkflows = () => api.get('/workflows');
export const getWorkflowAnalytics = () => api.get('/workflows/analytics');
export const getInefficientWorkflows = () => api.get('/workflows/inefficient');

// Hardware
export const getHardware = () => api.get('/hardware');
export const getHardwareAnalytics = () => api.get('/hardware/analytics');

// Storage
export const getStorage = () => api.get('/storage');
export const getStorageAnalytics = () => api.get('/storage/analytics');

// Overlap
export const getOverlaps = () => api.get('/overlap');
export const getOverlapAnalytics = () => api.get('/overlap/analytics');
export const detectOverlaps = () => api.post('/overlap/detect');

// Cloud Analysis
export const getCloudResources = () => api.get('/cloud-analysis');
export const getCloudAnalytics = () => api.get('/cloud-analysis/analytics');

// Reports
export const getExecutiveReport = () => api.get('/reports/executive');
export const getMSPReport = () => api.get('/reports/msp');

// Integrations
export const getIntegrations = () => api.get('/integrations');
export const syncIntegration = (integration: string) =>
  api.post('/integrations/sync', { integration });

// Auth
export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });
export const register = (userData: any) => api.post('/auth/register', userData);
