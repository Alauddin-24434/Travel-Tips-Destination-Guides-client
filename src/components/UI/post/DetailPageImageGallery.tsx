"use client";

import Image from "next/image";

interface IProps {
  images: string[];
}

const DetailPageImageGallery = ({ images }: IProps) => {
  return (
    <div className={`grid gap-4 mb-4 ${getGridClasses(images.length)}`}>
      {images.map((image, index) => (
        <div key={index} className="relative w-full h-96">
          <Image
            src={image}
            alt={`detail-image-${index + 1}`}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

// Function to return grid classes based on the number of images
const getGridClasses = (length: number) => {
  switch (length) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-2 grid-rows-2";
    case 4:
      return "grid-cols-2 grid-rows-2";
    default:
      return "grid-cols-3";
  }
};

export default DetailPageImageGallery;
