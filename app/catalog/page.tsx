import { fetchCars } from "@/lib/serverApi";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ClientCatalog from "./CatalogClient";
import css from "./page.module.css";

export default async function Catalog() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cars"],
    queryFn: ({ pageParam = 1 }) =>
      fetchCars({ perPage: "12", page: pageParam.toString() }),
    initialPageParam: 1,
  });
  return (
    <section className={css.container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientCatalog />
      </HydrationBoundary>
    </section>
  );
}
