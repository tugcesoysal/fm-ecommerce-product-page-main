import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

export default function GalleryView({ product, setGalleryViewOpen }) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleGalleryViewThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  const handlePrevious = () => {
    setMainImageIndex((mainImageIndex) => {
      return (mainImageIndex - 1 + 4) % 4;
    });
  };
  const handleNext = () => {
    setMainImageIndex((mainImageIndex) => {
      return (mainImageIndex + 1) % 4;
    });
  };

  return (
    <div className="galleryView">
      <IoMdClose
        className="close-icon"
        onClick={() => setGalleryViewOpen(false)}
      />
      <GrFormPrevious className="previous-icon" onClick={handlePrevious} />
      <GrFormNext className="next-icon" onClick={handleNext} />
      <img
        src={product.images[mainImageIndex]}
        className="main-image"
        alt="product"
      />

      <div className="thumbnails">
        {product.thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className={index === mainImageIndex ? "activeImageDiv" : ""}
          >
            <img
              src={thumbnail}
              className={
                index === mainImageIndex ? "activeImage thumbnail" : "thumbnail"
              }
              alt="product thumbnail"
              onClick={() => handleGalleryViewThumbnailClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
