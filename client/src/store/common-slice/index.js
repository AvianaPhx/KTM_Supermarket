import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  isLoading: false,
  featureImageList: [],
  bannerImageList: [],
  error: null, // Added error state
};

// Thunk to fetch feature images from your backend API
export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );
    return response.data;
  }
);

// Thunk to add a feature image to your backend API
export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

// Thunk to delete a feature image from your backend API
export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/common/feature/delete/${id}`
    );
    return response.data;
  }
);

// Thunk to fetch banner images from your backend API
export const getBannerImages = createAsyncThunk(
  "common/getBannerImages",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/banner/get`
    );
    return response.data;
  }
);

// Thunk to add a banner image to your backend API
export const addBannerImage = createAsyncThunk(
  "common/addBannerImage",
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/banner/add`,
      { image }
    );
    return response.data;
  }
);

// Thunk to delete a banner image from your backend API
export const deleteBannerImage = createAsyncThunk(
  "common/deleteBannerImage",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/common/banner/delete/${id}`
    );
    return response.data;
  }
);

// Create the slice
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch feature images from backend API
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Add feature image to backend API
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList.push(action.payload.data);
      })
      .addCase(addFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete feature image from backend API
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = state.featureImageList.filter(
          (image) => image._id !== action.payload.id
        );
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch banner images from backend API
      .addCase(getBannerImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBannerImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bannerImageList = action.payload.data;
      })
      .addCase(getBannerImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Add banner image to backend API
      .addCase(addBannerImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBannerImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bannerImageList.push(action.payload.data);
      })
      .addCase(addBannerImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete banner image from backend API
      .addCase(deleteBannerImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBannerImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bannerImageList = state.bannerImageList.filter(
          (image) => image._id !== action.payload.id
        );
      })
      .addCase(deleteBannerImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default commonSlice.reducer;