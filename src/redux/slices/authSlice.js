import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, fetchProfile } from '../../api/auth';


const initialState = {
    admin: null,
    status: 'idle',
};

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await login({
        email: email,
        password: password
      });

      window.localStorage.setItem('token', response.token);
      return response.admin;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const fetchAdminProfile = createAsyncThunk('auth/fetchAdminProfile', async () => {
  const response = await fetchProfile();
  return response;
});

export const logoutAdmin = createAsyncThunk('auth/logoutAdmin', async () => {
  window.localStorage.removeItem("token")
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.success = null;
    },
    clearSucces: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admin = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(fetchAdminProfile.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.admin = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(logoutAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
      })
      .addCase(logoutAdmin.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { clearError, clearSucces } = authSlice.actions;

export default authSlice.reducer;
