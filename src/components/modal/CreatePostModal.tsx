/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { ChangeEvent, useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { FaImage, FaTrash } from "react-icons/fa";
import { Divider } from "@nextui-org/divider";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";

import TSelect from "../form/TSelect";
import TTextarea from "../form/TTextArea";
import TInput from "../form/TInput";
import TForm from "../form/TForm";

import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import { useAddPostMutation } from "@/redux/features/post/postApi";
import { TResponse } from "@/types";
import { IPost } from "@/types/post.type";
import { postValidationSchema } from "@/schemas/post.schema";
import uploadImageToCloud from "@/utils/uploadImageCloud";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: function () {
        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input?.files?.[0];

          if (file) {
            const toastId = toast.loading("Image uploading", {
              duration: 2000,
            });

            if (file.size > 10485760) {
              return toast.warning(
                "File size exceeds 10 MB limit. Please select a smaller file."
              );
            }
            const url = await uploadImageToCloud(file);

            if (url) {
              toast.success("Image uploaded successfully", {
                duration: 2000,
                id: toastId,
              });
              const quill = (this as any).quill;
              const range = quill.getSelection();

              if (range) {
                quill.insertEmbed(range.index, "image", url);
              }
            } else {
              toast.error("Failed to upload image to Cloudinary");
            }
          }
        };
      },
    },
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const postCategoriesOptions = [
  { key: "Adventure", label: "Adventure" },
  { key: "Business Travel", label: "Business Travel" },
  { key: "Exploration", label: "Exploration" },
  { key: "Budget Travel", label: "Budget Travel" },
  { key: "Luxury Travel", label: "Luxury Travel" },
  { key: "Solo Travel", label: "Solo Travel" },
  { key: "Family Travel", label: "Family Travel" },
  { key: "Road Trips", label: "Road Trips" },
];

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: IProps) => {
  const [isPremiumContent, setIsPremiumContent] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const { data: currentUserData } = useGetCurrentUserQuery({});

  const [addPost, { isLoading: handleAddPostLoading, error: postError }] =
    useAddPostMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Upload images first, get the URLs
    const uploadedImagesUrls = await Promise.all(
      imageFiles.map((file) => uploadImageToCloud(file))
    );

    const postData = {
      ...data,
      content: value,
      author: currentUserData?.data?._id,
      isPremium: isPremiumContent,
      images: uploadedImagesUrls, // only send the URLs, not the File objects
    };

    try {
      const res = (await addPost(postData)) as TResponse<IPost>;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("Post created successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    } finally {
      onClose();
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setLoading(true);

    try {
      const uploadedImageUrl = await uploadImageToCloud(file);
      if (uploadedImageUrl) {
        setImageFiles((prevFiles) => [...prevFiles, file]);
        setImagePreviews((prevPreviews) => [
          ...prevPreviews,
          uploadedImageUrl,
        ]);
      }
    } catch (err: any) {
      setError("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Modal
      backdrop={"blur"}
      classNames={{
        base: "bg-background",
        header: "border-b border-divider",
        footer: "border-t border-divider",
        closeButton: "hover:bg-default-100 active:bg-default-200",
      }}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      size="3xl"
      onOpenChange={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Create Post</h2>
            </ModalHeader>
            <ModalBody className="my-8">
              <TForm
                resetOnSubmit={true}
                resolver={zodResolver(postValidationSchema)}
                onSubmit={onSubmit}
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <TInput label="Title" name="title" type="text" />
                    </div>
                    <div>
                      <TSelect
                        label="Category"
                        name="category"
                        options={postCategoriesOptions}
                        placeholder="Select your post category"
                      />
                    </div>
                    <div>
                      <TInput label="Location" name="location" type="text" />
                    </div>
                    {currentUserData?.data?.isVerified && (
                      <div className="sm:col-span-2 flex items-center">
                        <Checkbox
                          isSelected={isPremiumContent}
                          radius="full"
                          value="premium"
                          onValueChange={setIsPremiumContent}
                        >
                          <span className="text-sm">
                            Make this post premium content
                          </span>
                        </Checkbox>
                      </div>
                    )}
                  </div>

                  <div>
                    <TTextarea label="Short Description" name="description" />
                  </div>

                  <Divider className="my-4" />

                  <div>
                    <label
                      className="block text-sm font-medium text-default-700 mb-2"
                      htmlFor="image"
                    >
                      Upload Thumbnail
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-default-100 border-default-300 hover:bg-default-200 transition-colors duration-300"
                        htmlFor="image"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaImage className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            SVG, PNG, JPG, or GIF (MAX. 10MB)
                          </p>
                        </div>
                        <input
                          id="image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    <div className="flex gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative w-32 h-32 border rounded-lg overflow-hidden"
                        >
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
                            onClick={() => removeImage(index)}
                          >
                            <FaTrash className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-default-700 mb-2">
                      Content
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={setValue}
                      modules={modules}
                      formats={formats}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    color="primary"
                    isDisabled={handleAddPostLoading}
                    isLoading={loading || handleAddPostLoading}
                    radius="full"
                    size="lg"
                    type="submit"
                  >
                    Post
                  </Button>
                </div>
              </TForm>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
