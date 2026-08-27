"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import styles from "./Gallery.module.css";

interface GalleryProps {
  images: { id: string; original: string }[];
  name: string;
}

export default function Gallery({ images, name }: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const galleryImages =
    images.length >= 5
      ? images.slice(0, 5)
      : [...images, ...images.slice(0, 5 - images.length)];

  return (
    <div className={styles.gallery}>
      {/* Велике фото */}
      <Swiper
        modules={[Navigation, Thumbs]}
        loop={true}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        className={styles.mainSwiper}
      >
        {galleryImages.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img.original}
              alt={`${name} photo ${i + 1}`}
              width={638}
              height={505}
              className={styles.mainImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Мініатюри */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        className={styles.thumbSwiper}
      >
        {galleryImages.map((img, i) => (
          <SwiperSlide key={i} className={styles.swiperSlideMini}>
            <Image
              src={img.original}
              alt={`${name} thumbnail ${i + 1}`}
              width={134}
              height={144}
              className={styles.thumbImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
