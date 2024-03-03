import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { BlogPosts } from "@/components/blog-posts";

export const metadata = {
  title: "Badget Blog - Revolutionizing Real Estate with AI",
  description:
    "Explore the latest insights on AI in real estate, innovative property listing strategies, and industry trends in the Badget blog.",
};

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <main className="mx-auto max-w-6xl">
      <BlogPosts posts={posts} />
    </main>
  );
}
