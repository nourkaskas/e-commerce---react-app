// src/store/favoriteStore.js
import { create } from "zustand";

const getInitialFavorites = () => {
  const stored = localStorage.getItem("favorites");
  return stored ? JSON.parse(stored) : [];
};

const useFavoriteStore = create((set) => ({
  favorites: getInitialFavorites(),
  toggleFavorite: (post) =>
    set((state) => {
      const exists = state.favorites.find((f) => f.id === post.id);
      const updated = exists
        ? state.favorites.filter((f) => f.id !== post.id)
        : [...state.favorites, post];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return { favorites: updated };
    }),
}));

export default useFavoriteStore;
