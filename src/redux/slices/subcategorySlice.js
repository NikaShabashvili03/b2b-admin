import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllSubcategories, createSubcategory, editSubcategory, deleteSubcategory } from '../../api/subcategory';

const initialState = {
    data: [],
    status: 'idle',
    error: null,
    success: null,
};

export const fetchSubcategories = createAsyncThunk('subcategory/fetchSubcategories', async ({ categoryId }) => {
  const response = await fetchAllSubcategories(categoryId);
  return response.subcategory;
});

export const addSubcategory = createAsyncThunk('subcategory/addSubcategory', async (data) => {
  const response = await createSubcategory(data);
  return response.subcategory;
});

export const updateSubcategory = createAsyncThunk('subcategory/updateSubcategory', async ({ id, data }) => {
  const response = await editSubcategory(id, data);
  return response.subcategory;
});

export const removeSubcategory = createAsyncThunk('subcategory/removeSubcategory', async (id) => {
  const response = await deleteSubcategory(id);
  return response.subcategory;
});

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSubcategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSubcategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(addSubcategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSubcategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex(subcategory => subcategory._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateSubcategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeSubcategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeSubcategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter(subcategory => subcategory._id !== action.payload._id)
      })
      .addCase(removeSubcategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearError, clearSuccess } = subcategorySlice.actions;

export default subcategorySlice.reducer;