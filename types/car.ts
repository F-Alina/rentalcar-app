export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface CarsFiltersParams {
  brand?: string;
  rentalPrice?: string;
  mileageFrom?: number;
  mileageTo?: number;
  perPage?: string;
  page?: string;
}
