import PostCreationModal from "@/components/UI/PostCreationModal";
import Image from "next/image"; // Importing Image from next/image

export default function Landing() {
  return (
    <div className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-50">
      {/* Profile Avatar on the left */}
      <div className="mr-4">
        <Image
          src="https://res.cloudinary.com/dzzokyuu0/image/upload/v1728501132/vahavnuzb1yvpfgxxvop.jpg"
          alt="Profile Avatar"
          className="rounded-full object-cover"
          width={48} // 12 * 4 for responsive sizes
          height={48} // 12 * 4 for responsive sizes
        />
      </div>

      {/* Full-width Search Bar (opens modal) */}
      <div className="flex-grow">
        <PostCreationModal />
      </div>
    </div>
  );
}
