"use client";

import CreatePostModal from "@/components/modal/CreatePostModal";
import MyPost from "@/components/modules/my-post/MyPost";
import Container from "@/components/ui/Container";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useDisclosure } from "@nextui-org/modal";
import { IoAddCircleOutline } from "react-icons/io5";



const MyPostsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container>
      <div className="max-w-5xl w-full mx-auto my-12">
        <div className="mb-8 p-6 border border-default-200 rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-6 sm:mb-0">
              
              <h1 className="text-3xl sm:text-4xl font-bold">Content Management</h1>
            </div>
            <Button
              color="success"
              size="lg"
              startContent={<IoAddCircleOutline fontSize={"1.5rem"} />}
              variant="shadow"
              onPress={onOpen}
            >
              Create Post
            </Button>
          </div>
        </div>

        <div className="p-6 border border-default-200 rounded-2xl shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Your Posts</h2>
            <p className="text-default-600">
              Manage and edit your travel experiences here.
            </p>
          </div>
          <Divider className="my-6" />
          <div className="space-y-6">
            <MyPost />
          </div>
        </div>
      </div>
      <CreatePostModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default MyPostsPage;
