import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { IoClose } from "react-icons/io5";

// Placeholder images for the case when images are not provided
const placeholderImages = [
  "https://via.placeholder.com/300x200?text=Placeholder+1",
  "https://via.placeholder.com/300x200?text=Placeholder+2",
  "https://via.placeholder.com/300x200?text=Placeholder+3",
  "https://via.placeholder.com/300x200?text=Placeholder+4",
];

const CollageGrid = ({ images }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no images are provided, use placeholder images
  const imageSet = images && images.length > 0 ? images : placeholderImages;
  const remainingImages = imageSet?.length - 4;

  const handleShowSlider = (index) => {
    setCurrentIndex(index);
    setShowSlider(true);
  };

  const getGridTemplateColumns = (numImages) =>
    numImages > 1 ? `repeat(${Math.min(numImages, 4)}, 1fr)` : "1fr";

  return (
    <div className="collage-grid">
      <div className="full-width-image">
        <img
          onClick={() => handleShowSlider(0)}
          src={imageSet[0]}
          alt="First"
          className="first-image"
        />
      </div>
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: getGridTemplateColumns(imageSet?.length - 1),
        }}
      >
        {imageSet.slice(1, 5).map((image, index) => (
          <div key={index} className="grid-item">
            {index === 3 && remainingImages > 0 ? (
              <div className="plus-button" onClick={() => handleShowSlider(3)}>
                <img src={image} alt="Last" className="smaller-image" />
                <div className="overlay">
                  <span>+{remainingImages}</span>
                </div>
              </div>
            ) : (
              <img
                onClick={() => handleShowSlider(index + 1)}
                src={image}
                alt={`Images${index + 2}`}
                className="smaller-image"
              />
            )}
          </div>
        ))}
      </div>

      {showSlider && (
        <div className="slider-container">
          <IoClose onClick={() => setShowSlider(false)} id="splide-close" />
          <Splide
            options={{
              type: "loop",
              perPage: 1,
              gap: "1rem",
              pagination: true,
              autoplay: true,
              interval: 3000,
              arrows: true,
              start: currentIndex, // Start at the clicked image
            }}
          >
            {imageSet.map((image, index) => (
              <SplideSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="slider-image"
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}
    </div>
  );
};

export default CollageGrid;
