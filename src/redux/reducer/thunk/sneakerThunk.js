import { createAsyncThunk } from "@reduxjs/toolkit";

const DB = process.env.REACT_APP_DB;

export const fetchAllSneakers = createAsyncThunk(
  "sneakers/fetchAll",
  async () => {
    const response = await fetch(`${DB}/sneakers.json`);
    const result = await response.json();

    if (!response.ok) {
      return;
    }

    return result;
  }
);

export const fetchBrands = createAsyncThunk("brands/fetch", async () => {
  const response = await fetch(`${DB}/brands.json`);
  const result = await response.json();

  if (!response.ok) {
    return;
  }

  return result;
});

export const fetchSneakersByProduct = createAsyncThunk(
  "sneakers/fetchByProduct",
  async (product) => {
    const { brand, category, id } = product;

    // get brand icon
    const responseBrand = await fetch(`${DB}/brands/${brand}.json`);
    const resultBrand = await responseBrand.json();

    // get sneakers info
    const responseSneakers = await fetch(
      `${DB}/sneakers/${brand}/${category}/${id}.json`
    );
    const resultSneakers = await responseSneakers.json();

    if (!responseSneakers.ok) {
      return;
    }

    if (responseSneakers.ok) {
      resultSneakers["id"] = id;
      resultSneakers["brand"] = brand;
      resultSneakers["category"] = category;
      if (responseBrand.ok) {
        resultSneakers["brandImage"] = resultBrand;
      }
    }

    return resultSneakers;
  }
);

export const fetchFavoriteSneakers = createAsyncThunk(
  "fetch/favorites",
  async () => {
    const user = localStorage.getItem("localId");

    const response = await fetch(`${DB}/users/${user}.json`);
    const result = await response.json();

    return result;
  }
);

export const postSneakersToFavorites = async (product) => {
  const user = localStorage.getItem("localId");

  const favorites = await fetch(`${DB}/users/${user}.json`);
  const favoritesResult = await favorites.json();

  let itemExist = false;
  for (let key in favoritesResult) {
    if (favoritesResult[key].id === product.id) {
      itemExist = true;
      break;
    }
  }

  if (!itemExist) {
    const method = {
      method: "POST",
      body: JSON.stringify({
        id: product.id,
        brand: product.brand,
        brandImage: product.brandImage,
        category: product.category,
        description: product.description,
        image: product.image,
        name: product.name,
        price: product.price,
        release: product.release,
        type: product.type,
      }),
      header: {
        "Content-Type": "application/json",
      },
    };

    await fetch(`${DB}/users/${user}.json`, method);
  }
};

export const deleteFavoritePair = createAsyncThunk(
  "post/remove-fav",
  async (product) => {
    const user = localStorage.getItem("localId");

    await fetch(`${DB}/users/${user}/${product.key}.json`, {
      method: "DELETE",
    });

    return product;
  }
);
