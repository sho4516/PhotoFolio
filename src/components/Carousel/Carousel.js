import { useState } from "react";
import styles from "./Carousel.module.css";

const Carousel = ({ handleCloseCarousel, currentImageIndex, images }) => {
  const [currentIndex, setCurrentIndex] = useState(currentImageIndex);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.crossButton}>
        <button onClick={handleCloseCarousel}>{"x"}</button>
      </div>
      <div className={styles.backButton}>
        <button onClick={handlePrev}>{"<"}</button>
      </div>
      <div className={styles.carouselImage}>
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].name}
          className={styles.carouselImage}
        />
      </div>
      <div className={styles.nextButton}>
        <button onClick={handleNext}>{">"}</button>
      </div>
    </div>
  );
};

export default Carousel;
