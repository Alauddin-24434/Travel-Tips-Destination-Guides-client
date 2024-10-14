/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@nextui-org/button";
import { MessageCircle, Send } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/tooltip";
import { TResponse } from "@/types";
import { TComment } from "@/types/comment.type";
import TForm from "@/components/form/TForm";
import { commentValidationSchema } from "@/schemas/comment.schema";
import TTextarea from "@/components/form/TTextArea";
import CommentCard from "./commentCard";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAddCommentMutation } from "@/redux/features/comment/commentApi";




interface IProps {
  commentData: TComment[];
}

const Comment = ({ commentData }: IProps) => {
  // getting current user form redux
  const user = useAppSelector(useCurrentUser);
  const { postId } = useParams();

  const [addComment, { isLoading }] = useAddCommentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const comment = {
      post: postId,
      ...data,
    };

    try {
      const res = (await addComment(comment)) as TResponse<TComment>;

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("Comment posted successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <Card className="w-full bg-background shadow-md">
      <CardHeader className="flex flex-col items-start px-6 pt-6 pb-4">
        <div className="flex items-center w-full mb-4">
          <MessageCircle className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-2xl font-bold">
            Comments ({commentData.length})
          </h2>
        </div>
        <div className="w-full">
          <TForm
            resetOnSubmit={true}
            resolver={zodResolver(commentValidationSchema)}
            onSubmit={onSubmit}
          >
            <TTextarea label="Share your thoughts..." name="comment" />
            <div className="flex justify-end mt-4">
              <Tooltip
                closeDelay={2000}
                color="warning"
                content="Login First"
                isDisabled={user !== null}
              >
                <Button
                  className="px-6"
                  color="primary"
                  disabled={user === null}
                  isLoading={isLoading}
                  spinner={<Spinner color="default" size="sm" />}
                  startContent={<Send className="w-4 h-4" />}
                  type="submit"
                >
                  Send
                </Button>
              </Tooltip>
            </div>
          </TForm>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="px-6 py-4 overflow-y-auto max-h-[500px]">
        {commentData.map((comment, index) => (
          <div key={comment._id} className="w-full mb-6 last:mb-0">
            <CommentCard comment={comment} />
            {index < commentData.length - 1 && <Divider className="my-6" />}
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default Comment;
