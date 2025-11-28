import type { Car, CarsFiltersParams } from "@/types/car";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CarState = {
  cars: Car[];
  filters: CarsFiltersParams;
  addCars: (cars: Car[]) => void;
  removeCars: () => void;
  setFilters: (filters: CarsFiltersParams) => void;
  removeFilters: () => void;
  favorites: Car[];
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
};

export const useCarStore = create<CarState>()(
  persist(
    (set) => {
      return {
        cars: [],
        addCars: (cars: Car[]) =>
          set((state) => ({ cars: [...state.cars, ...cars] })),
        removeCars: () => set({ cars: [] }),
        filters: {},
        setFilters: (filters: CarsFiltersParams) => set({ filters }),
        removeFilters: () => set({ filters: {} }),
        favorites: [],
        addToFavorites: (car: Car) =>
          set((state) => {
            if (state.favorites.some((f) => f.id === car.id)) return state;
            return { favorites: [...state.favorites, car] };
          }),
        removeFromFavorites: (carId: string) =>
          set((state) => ({
            favorites: state.favorites.filter((car) => car.id !== carId),
          })),

        hasHydrated: false,
        setHasHydrated: (value) => set({ hasHydrated: value }),
      };
    },
    {
      name: "car-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
