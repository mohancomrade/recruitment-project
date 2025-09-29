import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UsersState, User, CreateUserRequest, UpdateUserRequest } from '../types';
import { usersApi } from '../services/api';

// Initial state
const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',
  viewMode: 'list',
};

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await usersApi.getUsers(page);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch users');
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: CreateUserRequest & { email?: string; avatar?: string }, { rejectWithValue }) => {
    try {
      const response = await usersApi.createUser(userData);
      // Since the API doesn't return a full user object, we'll create a mock one
      const nameParts = userData.name.split(' ');
      const firstName = nameParts[0] || userData.name;
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const newUser: User = {
        id: parseInt(response.id),
        first_name: firstName,
        last_name: lastName,
        email: userData.email || `${userData.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        avatar: userData.avatar || `https://via.placeholder.com/150?text=${firstName.charAt(0)}`,
      };
      return newUser;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }: { id: number; userData: UpdateUserRequest & { email?: string; avatar?: string } }, { rejectWithValue }) => {
    try {
      await usersApi.updateUser(id, userData);
      // Return the updated user data
      const nameParts = userData.name.split(' ');
      const firstName = nameParts[0] || userData.name;
      const lastName = nameParts.slice(1).join(' ') || '';
      
      return {
        id,
        first_name: firstName,
        last_name: lastName,
        email: userData.email || `${userData.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        avatar: userData.avatar || `https://via.placeholder.com/150?text=${firstName.charAt(0)}`,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      await usersApi.deleteUser(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete user');
    }
  }
);

// Users slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'list' | 'card'>) => {
      state.viewMode = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            email: action.payload.email,
            avatar: action.payload.avatar
          };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setViewMode, setCurrentPage, clearError } = usersSlice.actions;
export default usersSlice.reducer;


