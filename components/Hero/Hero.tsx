import Image from "next/image";
import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        <Image
          src="/hero.jpg" 
          alt="Camper by the lake"
          fill               
          className={styles.image}
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.heroTitle}>Campers of your dreams</h1>
        <p className={styles.heroDesc}>You can find everything you want in our catalog</p>
        <Link href="/catalog" className={styles.heroButton}>
          View Now
        </Link>
      </div>
    </section>
  );
}
