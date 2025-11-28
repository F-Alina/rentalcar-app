import { fetchCarById } from "@/lib/serverApi";
import type { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import CarDetails from "./CarDetails";
type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Car details | RentalCar",
  description: "View full information about a specific car.",
};

export default async function CarDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarDetails />
      </HydrationBoundary>
    </div>
  );
}
