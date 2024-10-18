/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";


import PostCard from ".";
import { useDebounce } from "@/utils/useDebounce";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import { IPost } from "@/types/post.type";


const AllPost = () => {
  const {  watch, reset, setValue } = useForm({
    defaultValues: { search: "" },
  });
  const [category, setCategory] = useState("");

  const searchTerm = useDebounce(watch("search"));

  const { data: postData } = useGetAllPostQuery({ searchTerm, category });

  const handleReset = () => {
    reset({ search: "" });
    setCategory("");
  };

  useEffect(() => {
    setValue("search", "");
  }, [category, reset, setValue]);

  return (
    <div>
   <div className="flex flex-col md:flex-row gap-4 my-6 max-w-xl w-full mx-auto">
  {/* Search Input */}
  <Input
    className="md:w-2/3 px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
    placeholder="Search posts..."
    type="text"
    value={watch("search")}
    onChange={(e) => setValue("search", e.target.value)}
  />

  {/* Category Select */}
  <Select
    className="md:w-1/3 px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
    placeholder="Select category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <SelectItem key="Adventure" value="Adventure">
      Adventure
    </SelectItem>
    <SelectItem key="Business Travel" value="Business Travel">
      Business Travel
    </SelectItem>
    <SelectItem key="Exploration" value="Exploration">
      Exploration
    </SelectItem>
    <SelectItem key="Budget Travel" value="Budget Travel">
      Budget Travel
    </SelectItem>
    <SelectItem key="Luxury Travel" value="Luxury Travel">
      Luxury Travel
    </SelectItem>
    <SelectItem key="Solo Travel" value="Solo Travel">
      Solo Travel
    </SelectItem>
    <SelectItem key="Family Travel" value="Family Travel">
      Family Travel
    </SelectItem>
    <SelectItem key="RoadTrips" value="Road Trips">
      Road Trips
    </SelectItem>
  </Select>

  {/* Reset Button */}
  <Button
  
    className="px-4 h-14 border py-2 md:mt-0 bg-gray-100 hover:bg-gray-200 text-gray-600  shadow-md transition-transform transform hover:scale-110"
    color="default"
  
    onClick={handleReset}
  >
 Refresh
  </Button>
</div>


      <div className="flex flex-col gap-6 my-6">
        {postData?.data?.map((post: IPost) => (
          <PostCard key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllPost;
