"use client";

import { MdStar, MdStarBorder } from "react-icons/md";
import styles from "./Reviews.module.css";
import { Review } from "@/types/camper";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className={styles.wrapper}>

      <ul className={styles.list}>
        {reviews.map((r) => (
          <li key={r.id} className={styles.item}>
            <div className={styles.header}>
              <div className={styles.avatar}>
                {r.reviewer_name.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong className={styles.name}>{r.reviewer_name}</strong>

                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) =>
                    i < r.reviewer_rating ? (
                      <MdStar key={i} size={20} />
                    ) : (
                      <MdStarBorder key={i} size={20} />
                    )
                  )}
                </div>
              </div>
            </div>

            <p className={styles.comment}>{r.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
