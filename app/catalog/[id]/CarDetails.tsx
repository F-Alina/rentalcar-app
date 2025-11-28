"use client";

import css from "./CarDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchCarById } from "@/lib/clientApi";
import BookingForm from "../../../components/BookingForm/BookingForm";
import Image from "next/image";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !car) return <p>Something went wrong.</p>;

  const [, city, country] = car.address.split(", ");

  return (
    <div className={css.container}>
      <div className={css.carContainerImg}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
          className={css.carImg}
        />
        <BookingForm />
      </div>

      <div className={css.carInfo}>
        <h2 className={css.title}>
          {car.brand} {car.model}, {car.year}{" "}
          <span className={css.carId}>Id: {car.id.slice(-4)}</span>
        </h2>
        <div className={css.location}>
          <svg width={16} height={16} className={css.iconLocation}>
            <use href="/sprite.svg#icon-Location"></use>
          </svg>
          <span className={css.carLocation}>
            {city}, {country}
          </span>
          <span className={css.carMileage}>
            Mileage: {new Intl.NumberFormat("uk-UA").format(car.mileage)} km
          </span>
        </div>
        <p className={css.carPrice}>${car.rentalPrice}</p>
        <p className={css.carDescription}>{car.description}</p>

        <div className={css.condition}>
          <h3 className={css.conditionTitle}>Rental Conditions:</h3>
          <ul className={css.conditionList}>
            {car.rentalConditions.map((condition, index) => (
              <li className={css.conditionItem} key={index}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-check-circle"></use>
                </svg>
                {condition}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.condition}>
          <h3 className={css.conditionTitle}>Car Specifications:</h3>
          <ul className={css.conditionList}>
            <li className={css.conditionItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-calendar"></use>
              </svg>
              Year: {car.year}
            </li>
            <li className={css.conditionItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-car"></use>
              </svg>
              Type: {car.type}
            </li>
            <li className={css.conditionItem}>
              {" "}
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-fuel-pump"></use>
              </svg>
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li className={css.conditionItem}>
              {" "}
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-gear"></use>
              </svg>
              Engine Size: {car.engineSize}
            </li>
          </ul>
        </div>

        <div>
          <h3 className={css.conditionTitle}>
            Accessories and Functionalities:
          </h3>
          <ul className={css.conditionList}>
            {[...car.accessories, ...car.functionalities].map((item, index) => (
              <li className={css.conditionItem} key={index}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-check-circle"></use>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
