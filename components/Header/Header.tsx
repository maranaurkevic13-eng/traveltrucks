"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
  return (
    <header className={styles.header}>
        <div className={styles.headerContainer}>
        <Link href="/" className={styles.logoLink} aria-label="TravelTrucks">
            <svg width={136} height={16}>
                <use href="logo.svg#icon-Logo"></use>
          </svg>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={`${styles.navLink} ${
              pathname === "/" ? styles.active : ""
            }`}>Home</Link>
          <Link href="/catalog" className={`${styles.navLink} ${
              pathname === "/catalog" ? styles.active : ""
            }`}>Catalog</Link>
        </nav>
      </div>
    </header>
  );
}
