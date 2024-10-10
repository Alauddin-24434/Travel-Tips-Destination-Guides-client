

// import { getRecentPosts } from "@/src/services/RecentPosts";
import Container from "@/components/UI/Container";
import PostsList from "@/components/UI/PostList";

export default async function RecentPosts() {
//   const { data: posts } = await getRecentPosts();

  return (
    <Container>
     <PostsList/>
       
    </Container>
  );
}