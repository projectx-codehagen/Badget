import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { formatDate } from "@/lib/utils";

// @ts-ignore
export function BlogPosts({ posts }) {
  return (
    <div className="container space-y-10 py-6 md:py-10">
      <section>
        <h2 className="mb-4 font-heading text-3xl">Last Post</h2>
        <article className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            {posts[0].meta.image && (
              <Image
                alt={posts[0].meta.title}
                className="w-full rounded-lg border object-cover object-center md:h-64 lg:h-72"
                height={452}
                src={posts[0].meta.image}
                width={804}
              />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-2 font-heading text-2xl md:text-4xl">
              <Balancer>{posts[0].meta.title}</Balancer>
            </h3>
            {posts[0].meta.description && (
              <p className="text-muted-foreground md:text-lg">
                <Balancer>{posts[0].meta.description}</Balancer>
              </p>
            )}
            <Link href={"/blog/" + posts[0].slug} className="absolute inset-0">
              <span className="sr-only">View Article</span>
            </Link>
          </div>
        </article>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-3xl">Blog Posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* @ts-ignore */}
          {posts.slice(1).map((post) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.meta.image && (
                <Image
                  alt={post.meta.title}
                  src={post.meta.image}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                />
              )}
              <h2 className="line-clamp-1 font-heading text-2xl">
                {post.meta.title}
              </h2>
              {post.meta.description && (
                <p className="line-clamp-1 text-muted-foreground">
                  {post.meta.description}
                </p>
              )}
              {post.date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.meta.date)}
                </p>
              )}
              <Link href={"/blog/" + post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
