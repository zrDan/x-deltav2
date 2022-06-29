import { createSlice } from "@reduxjs/toolkit";
import {
  deleteFavoritePairAction,
  fetchAllSneakersAction,
  fetchBrandsAction,
  fetchFavoriteSneakersAction,
  fetchSneakersByProductAction,
} from "./actions/sneakerAction";

const sneakerSlice = createSlice({
  name: "sneakers",
  initialState: {
    list: [],
    favorites: [],
    brands: {},
    pair: {},
    status: {
      list: undefined,
      brands: undefined,
      pair: undefined,
      favorites: undefined,
    },
  },
  extraReducers: (builder) => {
    fetchAllSneakersAction(builder);
    fetchBrandsAction(builder);
    fetchSneakersByProductAction(builder);
    fetchFavoriteSneakersAction(builder);
    deleteFavoritePairAction(builder);
  },
});

export default sneakerSlice.reducer;
