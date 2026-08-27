"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import CamperCard from "@/components/CamperCard/CamperCard";
import Filters from "@/components/Filters/Filters";
import css from "./catalogPage.module.css";
import Loader from "@/components/Loader/Loader";
import NoResults from "@/components/NoResults/NoResults";

export default function CatalogPage() {
  const [filters, setFilters] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const { data, fetchNextPage, hasNextPage, refetch, isFetching } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam = 1 }) => getCampers(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const items = lastPage.campers || lastPage || [];
      return items.length < 4 ? undefined : allPages.length + 1;
    },
  });

  return (
    <div className={css.cardPage}>  
      <Filters
        onApply={(filters) => {
          setFilters(filters);
          setShowLoader(true); 
          refetch().finally(() => setShowLoader(false)); 
        }}
      />

      <div className={css.catalogContent}>
        {/* Лоадер тільки при сабміті */}
        {showLoader && isFetching && <Loader />}

         {/* Якщо результатів нема */}
  {!showLoader && data?.pages.every((page) => (page.campers || page).length === 0) && (
    <NoResults onClear={() => {
      setFilters("");
      refetch();
    }} />
  )}

        {/* Картки */}
        {data?.pages.map((page) =>
          // .slice(0, 4) бере тільки перші 4 картки з кожного запиту
          (page.campers || page || [])
            .slice(0, 4)
            .map((camper) => <CamperCard key={camper.id} camper={camper} />)
        )}

        {hasNextPage && (
          <button
            type="button"
            className={css.loadMoreBtn}
            onClick={() => fetchNextPage()}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
