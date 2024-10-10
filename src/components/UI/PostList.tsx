"use client";
import { useGetAllPostsQuery, useVotePostMutation } from "@/redux/features/posts/postsApi";
import React, { useState } from "react";
import ImageModal from "./ImageModal"; // Ensure you have the modal component
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import Image from "next/image"; // Import Next.js Image component
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

// Define TPost interface
interface TPost {
  id: string;
  _id: string;
  title: string;
  category: string;
  content: string;
  images: string[]; // Assuming images is an array of strings (URLs)
  isPremium: boolean;
}

// Update type definition for the PostsList component
const PostsList: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?._id;
  const [ votePost]=useVotePostMutation()
  const { data: posts, error, isLoading } = useGetAllPostsQuery(undefined);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts</div>;

  const openModal = (postIndex: number, imageIndex: number) => {
    setSelectedImage(posts?.data[postIndex].images[imageIndex]); // Set the clicked image
    setCurrentIndex(postIndex); // Keep track of the current post
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    const totalImages = posts?.data[currentIndex].images.length || 0;
    const nextImageIndex = (posts?.data[currentIndex].images.indexOf(selectedImage || '') + 1) % totalImages;
    setSelectedImage(posts?.data[currentIndex].images[nextImageIndex]);
  };

  const handlePrev = () => {
    const totalImages = posts?.data[currentIndex].images.length || 0;
    const prevImageIndex = (posts?.data[currentIndex].images.indexOf(selectedImage || '') - 1 + totalImages) % totalImages;
    setSelectedImage(posts?.data[currentIndex].images[prevImageIndex]);
  };

  const handleUpvote = async (postId: string) => {
    try {
      await votePost({ postId,userId, voteType: "upVote" }).unwrap(); // Call the mutation
      console.log(`Successfully upvoted post: ${postId}`);
    } catch (error) {
      console.error("Failed to upvote post:", error);
    }
  };

  const handleDownvote = async (postId: string) => {
    try {
      await votePost({ postId, userId, voteType: "downVote" }).unwrap(); // Call the mutation
      console.log(`Successfully downvoted post: ${postId}`);
    } catch (error) {
      console.error("Failed to downvote post:", error);
    }
  };

  return (
    <div>
      {posts?.data?.map((post: TPost, postIndex: number) => (
        <div key={post.id} style={{ position: "relative", margin: "20px", border: "1px solid #ccc", borderRadius: "5px", padding: "15px", overflow: "hidden" }}>
          {post.isPremium && (
            <p style={{
              display: "inline-block",
              padding: "5px 10px",
              backgroundColor: "#ffcc00",
              color: "#333",
              borderRadius: "5px",
              fontWeight: "bold",
              marginBottom: "10px",
              right: "0",
            }}>Premium</p>
          )}
          <h2>{post.title}</h2>
          <h4>{post.category}</h4>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          {post.images.length > 0 && (
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              marginTop: "10px",
            }}>
              {post.images.map((image, imageIndex) => (
                <Image
                  key={imageIndex}
                  src={image}
                  alt={`Post Image ${imageIndex + 1}`}
                  onClick={() => openModal(postIndex, imageIndex)}
                  width={200} // Provide width and height for next/image
                  height={150}
                  style={{
                    flex: "1 1 30%",
                    height: "auto",
                    maxWidth: "calc(33.333% - 10px)",
                    cursor: "pointer",
                    borderRadius: "5px",
                    objectFit: "cover"
                  }}
                />
              ))}
            </div>
          )}

          {/* Voting Section */}
          <div className="flex items-center justify-between mt-2">
            <div style={{ display: "flex", alignItems: "center" }}>
              <BiSolidUpvote onClick={() => handleUpvote(post._id)} style={{ cursor: "pointer", marginRight: "10px", color: "#4CAF50" }} />
              <span className="mr-2">Vote</span>
              <BiSolidDownvote onClick={() => handleDownvote(post._id)} style={{ cursor: "pointer", color: "#F44336" }} />
            </div>
            {/* Comment Section */}
            Comments
          </div>
        </div>
      ))}

      {/* Modal for displaying enlarged image */}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          image={selectedImage}
          onClose={closeModal}
          images={posts?.data[currentIndex]?.images} // Pass all images of the current post
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default PostsList;
