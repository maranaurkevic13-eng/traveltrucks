"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import CamperCard from "@/components/CamperCard/CamperCard";
import Filters from "@/components/Filters/Filters";
import css from "./catalogPage.module.css";

export default function CatalogPage() {
  const [filters, setFilters] = useState("");

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam = 1 }) => getCampers(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Перевірка, чи є ще сторінки (якщо бекенд повертає page та totalPages)
      if (lastPage.page && lastPage.totalPages) {
        return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
      }
      
      // Якщо бекенд повертає масив items/campers меншим за 4, то це була остання сторінка
      const items = lastPage.campers || lastPage || [];
      return items.length < 4 ? undefined : (lastPage.page || 1) + 1;
    },
  });

  return (
    <div className={css.cardPage}>
      {/* Ліва колонка — Фільтри */}
      <Filters onApply={setFilters} />

      {/* Права колонка — Картки та кнопка */}
      <div className={css.catalogContent}>
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
