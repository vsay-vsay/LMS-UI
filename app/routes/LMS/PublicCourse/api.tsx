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

export const getPublicCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>('/api/courses/public');
    return response.data;
  } catch (error) {
    console.error('Error fetching private courses:', error);
    throw error;
  }
};

export const getCoursePublicFeatures = (course: Course): string[] => {
  const features = [];
  if (course.subject) features.push(`Subject: ${course.subject}`);
  if (course.classess) features.push(`Classes: ${course.classess}`);
  return features;
};