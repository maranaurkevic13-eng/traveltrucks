"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";  
import CamperCard from "@/components/CamperCard/CamperCard";

export default function CatalogPage() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["campers"],
      queryFn: ({ pageParam = 1 }) => getCampers(pageParam, ""),
    initialPageParam: 1, 
    getNextPageParam: (lastPage, pages) =>
      lastPage.page < lastPage.totalPages ? pages.length + 1 : undefined, 
  });

  return (
    <div>
      <h2>Catalog</h2>
      {data?.pages.map((page) =>
        page.campers.map((camper) => <CamperCard key={camper.id} camper={camper} />)
      )}
      {hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
    </div>
  );
}
