import fs from "fs";
import path from "path";
import { compareDesc } from "date-fns";
import matter from "gray-matter";

import { BlogPosts } from "./_components/blog-posts";

export const metadata = {
  title: "Badget Blog - Revolutionizing Real Estate with AI",
  description:
    "Explore the latest insights on AI in real estate, innovative property listing strategies, and industry trends in the Badget blog.",
};

export default async function BlogPage() {
  // find all files in the blog directory
  const postsDir = "app/(marketing)/blog/_posts";
  const files = fs.readdirSync(path.join(postsDir));

  // for each blog found
  const allPosts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data: frontMatter } = matter(fileContent);

    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  });

  const posts = allPosts
    // .filter((post) => post.meta.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.meta.date), new Date(b.meta.date));
    });

  return (
    <main className="mx-auto max-w-6xl">
      <BlogPosts posts={posts} />
    </main>
  );
}
