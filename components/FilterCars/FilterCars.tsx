"use client";
import css from "./FilterCars.module.css";
import { fetchCarBrands } from "@/lib/clientApi";
import { useState, useEffect } from "react";
import { useCarStore } from "@/lib/store/carStore";
import { useRef } from "react";

export default function FilterCars() {
  const { setFilters, removeFilters } = useCarStore();
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");
  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        isOpenBrand &&
        brandRef.current &&
        !brandRef.current.contains(target)
      ) {
        setIsOpenBrand(false);
      }

      if (
        isOpenPrice &&
        priceRef.current &&
        !priceRef.current.contains(target)
      ) {
        setIsOpenPrice(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpenBrand, isOpenPrice]);

  useEffect(() => {
    fetchCarBrands().then(setBrands);
  }, []);

  const handleSearch = () => {
    setFilters({
      brand: brand || undefined,
      rentalPrice: price || undefined,
      mileageFrom: mileageFrom ? Number(mileageFrom) : undefined,
      mileageTo: mileageTo ? Number(mileageTo) : undefined,
      page: "1",
    });
  };

  const handleReset = () => {
    setBrand("");
    setPrice("");
    setMileageFrom("");
    setMileageTo("");
    removeFilters();
  };

  const formatMileage = (value: string) => {
    if (!value) return "";
    const num = parseInt(value, 10);
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US");
  };

  const handleMileageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const raw = e.target.value.replace(/\D/g, "");
    setter(raw);
  };

  return (
    <div className={css.filtersContainer}>
      <div className={css.filters}>
        {/* BRAND */}
        <div className={css.dropdown} ref={brandRef}>
          <p className={css.dropdownText}>Car brand</p>
          <button
            className={css.dropdownToggle}
            onClick={() => setIsOpenBrand((p) => !p)}
          >
            {brand || "Choose a brand"}{" "}
            <svg className={css.arrow} width={16} height={16}>
              <use
                href={`/sprite.svg#${isOpenBrand ? "icon-Property-1Active-1" : "icon-Property-1Default-1"}`}
              />
            </svg>
          </button>

          {isOpenBrand && (
            <ul className={css.dropdownMenu}>
              <li
                className={css.dropdownItem}
                onClick={() => {
                  setBrand("");
                  setIsOpenBrand(false);
                }}
              >
                All brands
              </li>
              {brands.map((b) => (
                <li
                  className={css.dropdownItem}
                  key={b}
                  onClick={() => {
                    setBrand(b);
                    setIsOpenBrand(false);
                  }}
                >
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={css.dropdown} ref={priceRef}>
          <p className={css.dropdownText}>Price/ 1 hour</p>
          <button
            className={css.dropdownToggle}
            onClick={() => setIsOpenPrice((p) => !p)}
          >
            {price ? `To $${price}` : "Choose a price"}{" "}
            <svg className={css.arrow} width={16} height={16}>
              <use
                href={`/sprite.svg#${isOpenPrice ? "icon-Property-1Active-1" : "icon-Property-1Default-1"}`}
              />
            </svg>
          </button>

          {isOpenPrice && (
            <ul className={css.dropdownMenu}>
              {[30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((p) => (
                <li
                  className={css.dropdownItem}
                  key={p}
                  onClick={() => {
                    setPrice(p.toString());
                    setIsOpenPrice(false);
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={css.mileage}>
          <p className={css.mileageText}>Сar mileage / km</p>
          <div className={css.mileageContainer}>
            <input
              className={css.mileageInputs}
              type="text"
              placeholder="From"
              value={mileageFrom ? `From ${formatMileage(mileageFrom)}` : ""}
              onChange={(e) => handleMileageChange(e, setMileageFrom)}
            />
            <input
              className={css.mileageInputs}
              type="text"
              placeholder="To"
              value={mileageTo ? `To ${formatMileage(mileageTo)}` : ""}
              onChange={(e) => handleMileageChange(e, setMileageTo)}
            />
          </div>
        </div>
        <button className={css.searchBtn} onClick={handleSearch}>
          Search
        </button>
        <button className={css.searchBtn} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
