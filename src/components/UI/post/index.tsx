/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  MapPin,
  MessageCircle,
  MoreVertical,
  Edit2,
  Trash2,
  CheckIcon,
} from "lucide-react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { Spinner } from "@nextui-org/spinner";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Badge } from "@nextui-org/badge";
import { toast } from "sonner";
import { useDisclosure } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";

import EditPostModal from "../../modal/EditPostModal";

import ImageGallery from "./ImageGallery";
import { IPost } from "@/types/post.type";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useToggleFollowUnfollowUserMutation } from "@/redux/features/auth/authApi";
import { useDeletePostMutation, useHandleVotingMutation } from "@/redux/features/post/postApi";
import { TResponse } from "@/types";


export default function PostCard({ post }: { post: IPost }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // getting current logged in user from redux
  const user = useAppSelector(useCurrentUser);
  const [handleFollow, { isLoading: handleFollowLoading }] =
    useToggleFollowUnfollowUserMutation();

  // handle follow button function
  const handleFollowToggle = async (id: string) => {
    if (id) {
      const followData = {
        followingId: id,
      };

      await handleFollow(followData);
    }
  };

  // handle upvote function
  const [handleVote] = useHandleVotingMutation();

  const handleUpvote = async (id: string) => {
    const upvoteData = {
      id,
      data: {
        action: "upvote",
      },
    };

    await handleVote(upvoteData);
  };

  // handle downvote function
  const handleDownvote = async (id: string) => {
    const downvoteData = {
      id,
      data: {
        action: "downvote",
      },
    };

    await handleVote(downvoteData);
  };

  // handle share function
  const handleShare = async (copiedText: string) => {
    try {
      await navigator.clipboard.writeText(copiedText);
      toast.success("Post link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // delete post rtk query hook function

  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async (postId: string) => {
    const toastId = toast.loading("Deleting post...");

    const deletePostData = {
      id: postId,
    };

    try {
      const res = (await deletePost(deletePostData)) as TResponse<IPost>;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
          id: toastId,
        });
      } else {
        toast.success("Post deleted successfully", {
          duration: 2000,
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <Card className="max-w-xl w-full mx-auto">
      <CardBody className="p-4">
        {/* author information */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="relative">
              <Badge
                isOneChar
                className={`${!post?.author?.isVerified ? "hidden" : ""}`}
                color="success"
                content={<CheckIcon />}
                placement="bottom-right"
                shape="circle"
              >
                <Avatar
                  isBordered
                  alt={post?.author?.name}
                  className="w-12 h-12"
                  color="primary"
                  src={post?.author?.profileImage}
                />
              </Badge>
            </div>
            <div className="ml-3">
              <p className="font-semibold text-lg">{post?.author?.name}</p>
              <p className="text-sm text-default-500">
                {format(new Date(post?.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
          </div>

          {/* follow button */}

          {user?._id !== post?.author?._id ? (
            <Tooltip
              closeDelay={2000}
              color="warning"
              content="Login First"
              isDisabled={user !== null}
            >
              <Button
                className={`${
                  post?.author?.followers?.includes(user?._id)
                    ? "bg-success text-white"
                    : "bg-primary text-white"
                } flex items-center rounded-full `}
                disabled={user === null}
                isLoading={handleFollowLoading}
                size="sm"
                spinner={<Spinner size="sm" />}
                onClick={() => handleFollowToggle(post?.author?._id)}
              >
                {post?.author?.followers?.includes(user?._id) ? (
                  <>
                    <FiUserCheck className=" mr-1 w-5 h-5" /> Unfollow
                  </>
                ) : (
                  <>
                    <FiUserPlus className=" mr-1 w-5 h-5" /> Follow
                  </>
                )}
              </Button>
            </Tooltip>
          ) : (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Comment actions">
                <DropdownItem
                  key="edit"
                  startContent={<Edit2 className="w-4 h-4" />}
                  onPress={onOpen}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<Trash2 className="w-4 h-4" />}
                  onPress={() => handleDeletePost(post?._id)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          <EditPostModal isOpen={isOpen} post={post} onClose={onClose} />
        </div>

        <Link className="block mb-2" href={`/post/${post?._id}`}>
          <h1 className="text-2xl font-bold hover:text-blue-600 transition duration-300">
            {post?.title}
          </h1>
        </Link>
        <p className="text-default-700 dark:text-gray-300 mb-4">
          {post?.description?.substring(0, 100)}...
        </p>
        <div className="flex items-center mb-4">
          <MapPin className="w-4 h-4 text-default-500 mr-1" />
          <span className="text-sm text-default-500">{post?.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded">
            {post?.category}
          </span>
          {post?.isPremium && (
            <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded">
              Premium
            </span>
          )}
          {post?.author?.role === "ADMIN" && (
            <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-semibold px-2.5 py-0.5 rounded">
              Admin
            </span>
          )}
        </div>

        {/* post images */}
        <ImageGallery images={post?.images} />
      </CardBody>
      <CardFooter className="flex flex-wrap justify-between items-center px-4 py-3 bg-default-100 dark:bg-default-50">
        <div className="flex space-x-4 mb-2 sm:mb-0">
          <Tooltip
            closeDelay={2000}
            color="warning"
            content="Login First"
            isDisabled={user !== null}
          >
            <Button
              className={`${!post?.upvote?.includes(user?._id || "") ? "text-default-500" : "text-blue-600"}`}
              disabled={user === null}
              size="sm"
              variant="light"
              onClick={() => handleUpvote(post?._id)}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>{post?.upvote?.length}</span>
            </Button>
          </Tooltip>
          <Tooltip
            closeDelay={2000}
            color="warning"
            content="Login First"
            isDisabled={user !== null}
          >
            <Button
              className={`${!post?.downvote?.includes(user?._id || "") ? "text-default-500" : "text-red-600"}`}
              disabled={user === null}
              size="sm"
              variant="light"
              onClick={() => handleDownvote(post?._id)}
            >
              <ThumbsDown className="w-5 h-5" />
              <span>{post?.downvote?.length}</span>
            </Button>
          </Tooltip>
          <Link href={`/post/${post?._id}`}>
            <Button
              className="text-default-500 hover:text-blue-600"
              size="sm"
              variant="light"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post?.commentCount}</span>
            </Button>
          </Link>
        </div>
        <Button
          className="text-default-500 hover:text-blue-600"
          size="sm"
          variant="light"
          onClick={() =>
            handleShare(`http://localhost:3000/post/${post?._id}`)
          }
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
