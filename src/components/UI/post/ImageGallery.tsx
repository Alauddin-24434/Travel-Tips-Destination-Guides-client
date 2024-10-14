"use client";

import { useState } from "react";
import Image from "next/image";

interface IProps {
  images: string[];
}

const ManualImageGallery = ({ images }: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImage = images[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-96 mb-4">
      <Image
        fill
        alt={`gallery-image-${currentIndex + 1}`}
        className="rounded-lg object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 800px) 50vw, 33vw"
        src={visibleImage}
      />

      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
      >
        &lt;
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
      >
        &gt;
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-1 rounded-lg">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ManualImageGallery;
