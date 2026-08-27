"use client";

import css from "./NoResults.module.css";
import Image from "next/image";

export default function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className={css.noResults}>
       <Image
        src="/noResults.png" 
        alt="No campers illustration"
        width={488}
        height={463}
        priority
      />
      <h2 className={css.title}>No campers found</h2>
      <p className={css.text}>
       We couldn`t find any campers that match your filters.Try adjusting your search or clearing some filters.
      </p>
      <div className={css.actions}>
        <button className={css.clearBtn} onClick={onClear}>Clear filters</button>
        <button className={css.viewAllBtn} onClick={onClear}>View all campers</button>
      </div>
    </div>
  );
}
