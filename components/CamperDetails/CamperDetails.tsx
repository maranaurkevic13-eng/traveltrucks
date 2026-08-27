"use client";

import styles from "./CamperDetails.module.css";
import { Camper } from "@/types/camper"; 
import { FaStar } from "react-icons/fa6";
import { BsMap } from "react-icons/bs";

export default function CamperDetails({ camper }: { camper: Camper }) {
  return (
      <div className={styles.detailsWrapper}>
          <div className={styles.infoList}>
              <h2>{camper.name}</h2>
              <div className={styles.ratingContent}>
                <FaStar fill="#FFC531"/>
                <p className={styles.reting}>{camper.rating} ({camper.totalReviews} Reviews)</p>
              </div>
              <div className={styles.locationIcon}>
              <BsMap/>
              <p className={styles.location}>{camper.location}</p>
              </div>
              <p className={styles.price}>€{camper.price}</p>
              <p>{camper.description}</p>
          </div>

          <div className={styles.detailsContainer}>
            <h3>Vehicle details</h3>
              {Array.isArray(camper.amenities) && (
        <ul className={styles.featuresList}>
          {camper.amenities.map((amenity, i) => (
            <li key={i}>{amenity}</li>
          ))}
            <li>{camper.engine}</li>
           <li>{camper.transmission}</li>
        </ul>
              )}  
        <ul className={styles.detailsList}>
           <li>Form {camper.form}</li>
           <li>Length {camper.length}</li>
           <li>Width {camper.width}</li>
           <li>Height {camper.height}</li>
           <li>Tank {camper.tank}</li>
           <li>Consumption {camper.consumption}</li>
      </ul>  
        </div>
    </div>
  );
}
