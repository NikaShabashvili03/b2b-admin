import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProduct, createProduct, editProduct, deleteProduct } from '../../api/product';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  success: null,
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async ({ subcategoryId }) => {
  const response = await fetchAllProduct({ subcategoryId });
  return response.product;
});

export const addProduct = createAsyncThunk('product/addProduct', async ({ data }) => {
  const response = await createProduct(data);
  return response.product;
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, data }) => {
  const response = await editProduct(id, data);
  return response.product;
});

export const removeProduct = createAsyncThunk('product/removeProduct', async (id) => {
  const response = await deleteProduct(id);
  return response.product;
});

const productSlice = createSlice({
  name: 'product',
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
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex(product => product._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter(product => product._id !== action.payload._id);
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearError, clearSuccess } = productSlice.actions;

export default productSlice.reducer;