import React from 'react';
import PostCreationModal from "@/components/UI/PostCreationModal";

const PostEditor = () => {
  return (
    <div className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-50">
      {/* Profile Avatar on the left */}
      <div className="mr-4">
        <img
          src="https://res.cloudinary.com/dzzokyuu0/image/upload/v1728501132/vahavnuzb1yvpfgxxvop.jpg" 
          alt="Profile Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Full-width Search Bar (opens modal) */}
      <div className="flex-grow">
        <PostCreationModal />
      </div>
    </div>
  );
};

export default PostEditor;
