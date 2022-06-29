import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import Auth from "./routes/Auth";
import Private from "./routes/Private";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/product/:brand/:category/:id"
            element={<ProductPage />}
          />
          <Route
            path="/user"
            element={<Private component={<ProfilePage />} />}
          />
          <Route
            path="/favorites"
            element={<Private component={<FavoritesPage />} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
