import { BlogPosts } from "@/components/blog-posts";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export const metadata = {
  title: "Dingify Blog - Insights on Real-Time Monitoring & Analytics",
  description:
    "Explore the latest insights on real-time monitoring, data analytics, and journey tracking strategies in the Dingify blog. Stay ahead with innovative business analytics and industry trends.",
};

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <main>
      <BlogPosts posts={posts} />
    </main>
  );
}
