import { Camper } from "@/types/camper";
import Image from "next/image";
import styles from './CamperCard.module.css'
import { BsMap } from "react-icons/bs";
import { MdLocalGasStation } from "react-icons/md";
import { LiaSitemapSolid } from "react-icons/lia";
import { RiCarFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const imageSrc = camper.coverImage ?? camper.gallery[0]?.thumb ?? "/placeholder.jpg";

  return (
    <div className={styles.card}>
      <Image src={imageSrc} alt={camper.name} width={300} height={200} className={styles.image} />
      <div className={styles.cardContent}>
        <div className={styles.titleContent}>
          <h3 className={styles.title}>{camper.name}</h3>
           <p className={styles.price}>€{camper.price}</p>
        </div>
        <div className={styles.cardAssociattion}>
        <div className={styles.ratingContent}>
          <FaStar fill="#FFC531"/>
          <p className={styles.reting}>{camper.rating} ({camper.totalReviews} Reviews)</p>
        </div>
        <div className={styles.locationIcon}>
        <BsMap/>
          <p className={styles.location}>{camper.location}</p>
          </div>
          </div>
        <p className={styles.description}>{camper.description.slice(0, 80)}...</p>
        {/* Динамічні бейджі */}
    <div className={styles.tags}>
          <span className={styles.tag}>
            <MdLocalGasStation/>
            {camper.engine}</span>
          <span className={styles.tag}>
            <LiaSitemapSolid/>
            {camper.transmission}</span>
          <span className={styles.tag}>
            <RiCarFill/>
            {camper.form}</span>
    </div>
      <a href={`/catalog/${camper.id}`} target="_blank">
        <button className={styles.button}>Show more</button>
      </a>
      </div>
    </div>
  );
}
