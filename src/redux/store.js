import { configureStore } from "@reduxjs/toolkit";
import sneakersReducer from "./reducer/sneakers";
import authReducer from "./reducer/auth";

const store = configureStore(
  {
    reducer: {
      sneakers: sneakersReducer,
      auth: authReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
