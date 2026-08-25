"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import { Camper, CamperListResponse } from "@/types/camper";
import CamperCard from "@/components/CamperCard/CamperCard";

export default function CatalogPage() {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery<CamperListResponse>({
    queryKey: ["campers"],
    queryFn: ({ pageParam }) => getCampers(pageParam as number, ""),
    getNextPageParam: (lastPage, pages) =>
      lastPage.page < lastPage.totalPages ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {data?.pages.map((page) =>
        page.campers.map((camper: Camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))
      )}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load More</button>
      )}
    </div>
  );
}
