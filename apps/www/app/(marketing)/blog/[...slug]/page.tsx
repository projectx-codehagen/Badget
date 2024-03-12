import { notFound } from "next/navigation";
import matter from "gray-matter";

import "@/styles/mdx.css";

import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Balancer from "react-wrap-balancer";

import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

function getPostFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");

  // find all files in the blog directory
  const postsDir = "app/(marketing)/blog/_posts";
  const files = fs.readdirSync(path.join(postsDir));

  // for each blog found
  const allPosts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data: frontMatter, content } = matter(fileContent);

    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
      content,
    };
  });

  return allPosts.find((post) => post.slug === slug);
}

function getAuthorFromPost(name: string[]) {
  // find all files in the blog directory
  const authorsDir = "app/(marketing)/blog/_authors";
  const files = fs.readdirSync(path.join(authorsDir));

  // for each blog found
  const allAuthors = files.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(authorsDir, filename),
      "utf-8",
    );
    const { data: frontMatter } = matter(fileContent);

    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  });

  return allAuthors.filter((author) => name.includes(author.meta.title));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const authors = getAuthorFromPost(post.meta.authors);

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex",
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {post.meta.date && (
          <time
            dateTime={post.meta.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.meta.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          <Balancer>{post.meta.title}</Balancer>
        </h1>
        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author.meta._id}
                  href={`https://twitter.com/${author.meta.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.meta.avatar}
                    alt={author.meta.title}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.meta.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.meta.twitter}
                    </p>
                  </div>
                </Link>
              ) : null,
            )}
          </div>
        ) : null}
      </div>
      {post.meta.image && (
        <Image
          src={post.meta.image}
          alt={post.meta.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}
      <MDXRemote source={post.content} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
}
