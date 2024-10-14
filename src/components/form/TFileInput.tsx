/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";


import uploadImageToCloud from "@/utils/uploadImageCloud";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
}

const TFileInput = ({ label, name }: IProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setValue(name, file);

      // Call your upload function
      try {
        const uploadedImageUrl = await uploadImageToCloud(file);
        console.log("Uploaded Image URL:", uploadedImageUrl); // Save or use the URL as needed
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="flex flex-col">
     
      <input
      onChange={handleFileChange}
        type="file"
        name={name}
        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 transition duration-300 hover:border-blue-600 focus:outline-none focus:border-blue-600"
      />
      
    </div>
  );
};

export default TFileInput;
