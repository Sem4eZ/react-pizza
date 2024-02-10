import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ sortBy, order, category, search, currentPage }) => {
    try {
      const { data } = await axios.get(
        `https://65bbae1852189914b5bcdaf4.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}&search=${search}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
