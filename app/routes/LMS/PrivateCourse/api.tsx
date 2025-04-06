import axios from 'axios';

const LMS_URL = import.meta.env.VITE_LMS_URL;

// Course interface remains the same
export interface Course {
  _id: string;
  playlistName: string;
  description: string;
  price: number;
  visibility: string;
  domain: string;
  tutor: {
    _id: string;
    name: string;
    email: string;
  };
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  classess?: string;
  subject?: string;
}

// Create axios instance with default headers
const api = axios.create({
  baseURL: LMS_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getPrivateCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>('/api/courses/private');
    return response.data;
  } catch (error) {
    console.error('Error fetching private courses:', error);
    throw error;
  }
};

export const getCourseFeatures = (course: Course): string[] => {
  const features = [];
  if (course.subject) features.push(`Subject: ${course.subject}`);
  if (course.classess) features.push(`Classes: ${course.classess}`);
  return features;
};

// src/api.tsx
export const fetchCourseById = async (id: string) => {
  try {
    const token = localStorage.getItem('token'); // Or your token storage method
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${LMS_URL}/api/courses/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch course');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};