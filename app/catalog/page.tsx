"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import CamperCard from "@/components/CamperCard/CamperCard";
import Filters from "@/components/Filters/Filters";

export default function CatalogPage() {
  const [filters, setFilters] = useState("");

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam = 1 }) => getCampers(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  return (
    <div>
      <Filters onApply={setFilters} />

      {data?.pages.map((page) =>
        page.campers.map((camper) => <CamperCard key={camper.id} camper={camper} />)
      )}

      {hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
    </div>
  );
}
