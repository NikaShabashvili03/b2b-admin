import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCustomer } from '../../api/customers';


const initialState = {
    data: [],
    status: 'idle',
};

export const fetchCustomers = createAsyncThunk('customer/fetchCustomers', async () => {
  const response = await fetchAllCustomer();
  return response;
});


const customerSlice = createSlice({
  name: 'customer',
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
      .addCase(fetchCustomers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
});

export const { clearError, clearSucces } = customerSlice.actions;

export default customerSlice.reducer;
