import { IoBookmarkOutline } from "react-icons/io5";
import { Divider } from "@nextui-org/divider";
import Container from "@/components/ui/Container";
import MyBookmark from "@/components/modules/bookmark/MyBookmark";



const MyBookmarkPostPage = () => {
  return (
    <Container>
      <div className="max-w-5xl w-full mx-auto my-12">
        <div className="mb-8 p-6 border border-default-200 rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-6 sm:mb-0">
              <IoBookmarkOutline className="text-primary text-4xl mr-4" />
              <h1 className="text-3xl sm:text-4xl font-bold">
                Bookmarked Posts
              </h1>
            </div>
          </div>
        </div>

        <div className="p-6 border border-default-200 rounded-2xl shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Your Saved Travels</h2>
            <p className="text-default-600">
              Revisit and explore the travel experiences you have bookmarked for
              future inspiration.
            </p>
          </div>
          <Divider className="my-6" />
          <div className="space-y-6">
            <MyBookmark />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyBookmarkPostPage;
