import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCategory, createCategory, editCategory, deleteCategory } from '../../api/categories';

const initialState = {
    data: [],
    status: 'idle',
};

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const response = await fetchAllCategory();
  return response;
});

export const addCategory = createAsyncThunk('category/addCategory', async (data) => {
  const response = await createCategory(data);
  return response;
});

export const updateCategory = createAsyncThunk('category/updateCategory', async ({ id, data }) => {
  const response = await editCategory(id, data);
  return response;
});

export const removeCategory = createAsyncThunk('category/removeCategory', async (id) => {
  const response = await deleteCategory(id);
  return response;
});

const categorySlice = createSlice({
  name: 'category',
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
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(addCategory.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex(category => category._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(removeCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter(category => category._id !== action.payload._id);
      })
      .addCase(removeCategory.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { clearError, clearSuccess } = categorySlice.actions;

export default categorySlice.reducer;