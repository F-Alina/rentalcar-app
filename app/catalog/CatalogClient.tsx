"use client";
import { fetchCars } from "@/lib/clientApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCarStore } from "@/lib/store/carStore";
import CarList from "@/components/CarList/CarList";
import Loader from "@/components/Loader/Loader";
import FilterCard from "@/components/FilterCars/FilterCars";
import css from "./page.module.css";

export default function ClientCatalog() {
  const { filters } = useCarStore();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchCars({ ...filters, perPage: "12", page: pageParam.toString() }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const current = Number(lastPage.page);
      const total = Number(lastPage.totalPages);
      return current < total ? current + 1 : undefined;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading cars...</p>;
  if (error) return <p>Failed to load cars</p>;

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];
  return (
    <div>
      <FilterCard />
      <CarList cars={cars} />;
      <div className={css.loadMoreContainer}>
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={css.loadMoreBtn}
          >
            {isFetchingNextPage ? <Loader /> : " Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
