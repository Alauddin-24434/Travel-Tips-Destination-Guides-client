/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCurrentUserQuery, useUpdateUserMutation } from "@/redux/features/auth/authApi";
import { TResponse, TUser } from "@/types";
import Container from "@/components/ui/Container";
import Loading from "@/components/ui/Loading";
import TForm from "@/components/form/TForm";
import { userUpdateValidationSchema } from "@/schemas/auth.schema";
import TInput from "@/components/form/TInput";
import TSelect from "@/components/form/TSelect";
import TTextarea from "@/components/form/TTextArea";



const genderOptions = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
  { key: "other", label: "Other" },
];

const EditProfilePage = () => {
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    const userData = {
      ...data,
    };

    formData.append("userData", JSON.stringify(userData));

    formData.append("profileImage", imageFile);

    try {
      const res = (await updateUser(formData)) as TResponse<TUser>;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("User updated successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { data: currentUserData, isLoading: currentUserLoading } =
    useGetCurrentUserQuery({});

  const userData = currentUserData?.data;

  const userDefaultValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    gender: userData?.gender || "",
    bio: userData?.bio || "",
    mobileNumber: userData?.mobileNumber || "",
    birthDate: userData?.birthDate || "",
    address: userData?.address || "",
  };

  return (
    <Container>
      {currentUserLoading ? (
        <Loading />
      ) : (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader className="flex flex-col items-center pb-0 pt-6 px-4">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                {imagePreview ? (
                  <img
                    alt="Profile"
                    className="w-full h-full object-cover"
                    src={imagePreview}
                  />
                ) : (
                  <img
                    alt="Profile"
                    className="w-full h-full object-cover"
                    src={currentUserData?.data?.profileImage}
                  />
                )}
              </div>
              <label
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer"
                htmlFor="profile-image"
              >
                <span className="hidden">upload profile</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </label>
              <input
                accept="image/*"
                className="hidden"
                id="profile-image"
                type="file"
                onChange={handleImageChange}
              />
            </div>
          </CardHeader>
          <CardBody className="px-4 py-6">
            <TForm
              defaultValues={userDefaultValues}
              resetOnSubmit={false}
              resolver={zodResolver(userUpdateValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="py-2">
                  <TInput label="Name" name="name" type="text" />
                </div>
                <div className="py-2">
                  <TSelect
                    label="Gender"
                    name="gender"
                    options={genderOptions}
                    placeholder="Select your gender"
                  />
                </div>
                <div className="py-2">
                  <TInput
                    isDisabled={true}
                    label="Email (Can't be changed)"
                    name="email"
                    type="email"
                  />
                </div>
                <div className="py-2">
                  <TInput
                    label="Mobile Number"
                    name="mobileNumber"
                    type="text"
                  />
                </div>
                <div className="py-2">
                  <TInput
                    isDisabled={true}
                    label="Birth date (Can't be changed)"
                    name="birthDate"
                    type="text"
                  />
                </div>
                <div className="py-2">
                  <TInput label="Address" name="address" type="text" />
                </div>
                <div className="py-2 sm:col-span-2">
                  <TTextarea label="Bio" name="bio" />
                </div>
              </div>

              <div className="w-full flex justify-center">
                <Button
                  className="w-2/5  py-2 mt-6 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105"
                  isLoading={updateUserLoading}
                  size="lg"
                  spinner={<Spinner color="default" size="sm" />}
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </TForm>
          </CardBody>
        </Card>
      )}
    </Container>
  );
};

export default EditProfilePage;
