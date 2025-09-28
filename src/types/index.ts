// User types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface CreateUserRequest {
  name: string;
  job: string;
}

export interface UpdateUserRequest {
  name: string;
  job: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  job: string;
  createdAt: string;
}

export interface UpdateUserResponse {
  name: string;
  job: string;
  updatedAt: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Users state types
export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  viewMode: 'list' | 'card';
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ApiError {
  error: string;
}

// Root state type
export interface RootState {
  auth: AuthState;
  users: UsersState;
}


