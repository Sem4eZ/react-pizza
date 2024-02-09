import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (payload) => {
    const { sortBy, order, category, search, currentPage } = payload.params;
    const { data } = await axios.get(
      `https://65bbae1852189914b5bcdaf4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
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
    // builder.addCase(fetchPizzas.pending, (state, action) => {
    //   console.log("ОТправка");
    // });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      console.log(action.error); // Log the error for further investigation
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
