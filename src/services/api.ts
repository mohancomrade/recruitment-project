import axios from 'axios';
import {
  User,
  LoginRequest,
  LoginResponse,
  CreateUserRequest,
  CreateUserResponse, 
  UpdateUserRequest,
  UpdateUserResponse,
  ApiResponse,
} from '../types';

const API_BASE_URL = 'https://reqres.in/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add request interceptor to include auth token and API key
api.interceptors.request.use(
  (config) => {
    // Add ReqRes.in API key
    if (config.headers) {
      config.headers['x-api-key'] = 'reqres-free-v1';
    }
    
    // Add auth token for authenticated requests
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login on 401 if it's not a login request
    if (error.response?.status === 401 && !error.config?.url?.includes('/login')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', credentials);
    return response.data;
  },
};

// Users API
export const usersApi = {
  getUsers: async (page: number = 1): Promise<ApiResponse<User[]>> => {
    const response = await api.get<ApiResponse<User[]>>(`/users?page=${page}`);
    return response.data;
  },

  getUserById: async (id: number): Promise<{ data: User }> => {
    const response = await api.get<{ data: User }>(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
    const response = await api.post<CreateUserResponse>('/users', userData);
    return response.data;
  },

  updateUser: async (id: number, userData: UpdateUserRequest): Promise<UpdateUserResponse> => {
    const response = await api.put<UpdateUserResponse>(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

export default api;
