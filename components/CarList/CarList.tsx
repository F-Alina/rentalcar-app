import { Car } from "@/types/car";
import { useCarStore } from "@/lib/store/carStore";
import css from "./CarList.module.css";
import { useState } from "react";
import Loader from "../Loader/Loader";
import Link from "next/link";
import Image from "next/image";

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  const [loading, setLoading] = useState(false);

  const handleReadMore = () => {
    setLoading(true);

    setTimeout(() => setLoading(false), 500);
  };

  const favorites = useCarStore((s) => s.favorites);
  const addToFavorites = useCarStore((s) => s.addToFavorites);
  const removeFromFavorites = useCarStore((s) => s.removeFromFavorites);
  const hasHydrated = useCarStore((s) => s.hasHydrated);

  const toggleFavorite = (e: React.MouseEvent, car: Car) => {
    e.stopPropagation();
    e.preventDefault();

    const isFav = favorites.some((f) => f.id === car.id);
    if (isFav) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  return (
    <ul className={css.carList}>
      {cars.map((car) => {
        const [, city, country] = car.address.split(", ");

        const isFavorite = favorites.some((f) => f.id === car.id);

        return (
          <li key={car.id} className={css.listItem}>
            <div className={css.carContainerImg}>
              <Image
                className={css.cartImg}
                src={car.img}
                alt={car.description}
                width={276}
                height={268}
              />

              {hasHydrated && (
                <button
                  onClick={(e) => toggleFavorite(e, car)}
                  className={css.favoriteBtn}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  {isFavorite ? (
                    <svg width={16} height={16} className={css.fillBtn}>
                      <use href="/sprite.svg#icon-Property-1Active"></use>
                    </svg>
                  ) : (
                    <svg width={16} height={16} className={css.strokeBtn}>
                      <use href="/sprite.svg#icon-Property-1Default"></use>
                    </svg>
                  )}
                </button>
              )}
            </div>

            <div className={css.carContent}>
              <div className={css.content}>
                <h3 className={css.carBrand}>
                  {car.brand} <span className={css.carModel}>{car.model}</span>,{" "}
                  {car.year}
                </h3>
                <span className={css.car}>${car.rentalPrice}</span>
              </div>

              <div className={css.infoRow}>
                <span className={css.city}>{city}</span>{" "}
                <span className={css.divider}>|</span> {country}{" "}
                <span className={css.divider}>|</span>{" "}
                <span>{car.rentalCompany}</span>
                <div className={css.extraRow}>
                  <span>{car.type}</span> <span className={css.divider}>|</span>{" "}
                  <span>
                    {new Intl.NumberFormat("uk-UA").format(car.mileage)} km
                  </span>
                </div>
              </div>

              <Link href={`/catalog/${car.id}`} onClick={handleReadMore}>
                <button className={css.button}>
                  {loading ? <Loader /> : "Read more"}
                </button>
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
