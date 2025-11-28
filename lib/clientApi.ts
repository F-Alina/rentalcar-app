import { api } from "@/lib/api";
import type { Car, FetchCarsResponse, CarsFiltersParams } from "@/types/car";

export const fetchCars = async (
  params?: CarsFiltersParams
): Promise<FetchCarsResponse> => {
  const queryParams = {
    ...(params?.brand && { brand: params.brand }),
    ...(params?.rentalPrice && { rentalPrice: params.rentalPrice }),
    ...(params?.mileageFrom && { minMileage: params.mileageFrom }),
    ...(params?.mileageTo && { maxMileage: params.mileageTo }),
    limit: params?.perPage || "12",
    page: params?.page || "1",
  };
  const response = await api.get<FetchCarsResponse>("/cars", {
    params: queryParams,
  });

  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
};

export const fetchCarBrands = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/brands");
  return response.data;
};
