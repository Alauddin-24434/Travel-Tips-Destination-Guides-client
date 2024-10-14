/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import Loading from "@/components/ui/Loading";
import Comment from "@/components/ui/post/comment";
import PostDetailsCard from "@/components/ui/post/PostDetailsCard";
import PremiumCard from "@/components/ui/PremiumCard";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import { useGetMyCommentQuery } from "@/redux/features/comment/commentApi";
import { useGetSinglePostQuery } from "@/redux/features/post/postApi";
import { Divider } from "@nextui-org/divider";
import { Spinner } from "@nextui-org/spinner";



interface IProps {
  params: {
    postId: string;
  };
}

export default function PostDetails({ params }: IProps) {
  const { data: currentUserData } = useGetCurrentUserQuery({});

  // getting single post data
  const { data: postData, isLoading: postLoading } = useGetSinglePostQuery(
    params.postId,
  );

  // getting comments for that individual post
  const { data: commentData, isLoading: commentLoading } = useGetMyCommentQuery(
    postData?.data?._id,
    {
      skip: postLoading,
    },
  );

  const isPremiumAndNotVerified =
    postData?.data?.isPremium && !currentUserData?.data?.isVerified;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {postLoading ? (
        <Loading />
      ) : (
        <div>
          {isPremiumAndNotVerified && <PremiumCard />}
          <PostDetailsCard postData={postData?.data!} />
        </div>
      )}

      <Divider className="my-8" />
      {postLoading || commentLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <Comment commentData={commentData?.data!} />
      )}
    </div>
  );
}
