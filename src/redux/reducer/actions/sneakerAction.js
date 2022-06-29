import {
  deleteFavoritePair,
  fetchAllSneakers,
  fetchBrands,
  fetchFavoriteSneakers,
  fetchSneakersByProduct,
} from "../thunk/sneakerThunk";

export const fetchAllSneakersAction = (builder) => {
  builder
    .addCase(fetchAllSneakers.pending, (state) => {
      state.status.list = "loading";
    })
    .addCase(fetchAllSneakers.fulfilled, (state, action) => {
      const data = action.payload;
      const randomList = [];
      const list = [];

      for (const brand in data) {
        for (const category in data[brand]) {
          for (const id in data[brand][category]) {
            const newItem = data[brand][category][id];
            newItem["id"] = id;
            newItem["brand"] = brand;
            newItem["category"] = category;
            list.push(newItem);
          }
        }
      }

      let size = list.length - 1;
      while (size !== -1) {
        let rnd = Math.floor(Math.random() * (size - 0) + 0);
        let popItem = list.splice(rnd, 1);
        randomList.push(popItem[0]);
        size--;
      }

      state.list = randomList;
      state.status.list = "success";
    })
    .addCase(fetchAllSneakers.rejected, (state, action) => {
      state.status.list = "error";
    });
};

export const fetchBrandsAction = (builder) => {
  builder
    .addCase(fetchBrands.pending, (state) => {
      state.status.brands = "loading";
    })
    .addCase(fetchBrands.fulfilled, (state, action) => {
      const data = action.payload;
      state.brands = data;
      state.status.brands = "success";
    })
    .addCase(fetchBrands.rejected, (state, action) => {
      state.status.brands = "error";
    });
};

export const fetchSneakersByProductAction = (builder) => {
  builder
    .addCase(fetchSneakersByProduct.pending, (state) => {
      state.status.pair = "loading";
    })
    .addCase(fetchSneakersByProduct.fulfilled, (state, action) => {
      const data = action.payload;
      state.pair = data;
      state.status.pair = "success";
    })
    .addCase(fetchSneakersByProduct.rejected, (state, action) => {
      state.status.pair = "error";
    });
};

export const fetchFavoriteSneakersAction = (builder) => {
  builder
    .addCase(fetchFavoriteSneakers.pending, (state) => {
      state.status.favorites = "loading";
    })
    .addCase(fetchFavoriteSneakers.fulfilled, (state, action) => {
      const data = action.payload;

      if (data === null) {
        state.status.favorites = "error";
        return;
      }

      state.favorites = [];

      for (let key in data) {
        data[key]["key"] = key;
        state.favorites.push(data[key]);
      }

      state.status.favorites = "success";
    })
    .addCase(fetchFavoriteSneakers.rejected, (state, action) => {
      state.status.favorites = "error";
    });
};

export const deleteFavoritePairAction = (builder) => {
  builder.addCase(deleteFavoritePair.fulfilled, (state, action) => {
    const data = action.payload;

    const newList = state.favorites.filter((item) => item.id !== data.id);

    state.favorites = newList;
  });
};
