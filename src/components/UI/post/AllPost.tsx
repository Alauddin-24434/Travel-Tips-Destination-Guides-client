/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { MdRefresh } from "react-icons/md";

import PostCard from ".";
import { useDebounce } from "@/utils/useDebounce";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import { IPost } from "@/types/post.type";


const AllPost = () => {
  const { register, watch, reset, setValue } = useForm({
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
        <Input
          className="md:w-2/3"
          placeholder="Search posts..."
          type="text"
          value={watch("search")}
          onChange={(e) => setValue("search", e.target.value)}
        />

        <Select
          className="md:w-1/3"
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

        <Button
          isIconOnly
          className="mt-2 md:mt-0"
          color="default"
          variant="flat"
          onClick={handleReset}
        >
          <MdRefresh size={24} />
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
