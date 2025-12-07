import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL:", API_BASE_URL);


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const createNote = async (noteData) => {
  try {
    const response = await api.post('/create', noteData);
    return response;
  } catch (error) {
    throw new Error('Failed to create note');
  }
};

export const getNotes = async (date = null) => {
  try {
    const params = date ? { params: { date } } : {};
    const response = await api.get('/notes', params);
    return response.notes || [];
  } catch (error) {
    throw new Error('Failed to fetch notes');
  }
};

export const updateNote = async (id, noteData) => {
  try {
    const response = await api.patch(`/update/${id}`, noteData);
    return response;
  } catch (error) {
    throw new Error('Failed to update note');
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response;
  } catch (error) {
    throw new Error('Failed to delete note');
  }
};
