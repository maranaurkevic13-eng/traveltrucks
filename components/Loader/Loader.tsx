"use client";

import css from "./Loader.module.css";

export default function Loader() {
  return (
      <div className={css.loaderOverlay}>
      <div className={css.loaderContainer}>
      <div className={css.loaderSpinner}></div>
            <p className={css.loaderText}>Loading tracks...</p>
            <p className={css.loaderDesc}>Please wait while we fetch the best travel trucks for you</p>
        </div>
    </div>
  );
}