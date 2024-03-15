import { Route } from "next";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: (props) => (
      <h1 className="font-cal mb-4 mt-8 font-heading text-4xl" {...props}>
        {props.children}
      </h1>
    ),
    h2: (props) => (
      <h2 className="font-cal text-xl text-muted-foreground" {...props}>
        {props.children}
      </h2>
    ),
    h3: (props) => (
      <h3 className="font-cal mt-8 scroll-m-20 text-3xl" {...props}>
        {props.children}
      </h3>
    ),
    h4: (props) => (
      <h4 className="font-cal -mb-4 mt-6 scroll-m-20 text-2xl" {...props}>
        {props.children}
      </h4>
    ),
    p: (props) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
    ),
    a: ({ children, href }) => {
      const isExternal = href?.startsWith("http");
      const Component = isExternal ? "a" : Link;
      return (
        <Component
          href={href as Route}
          className="underline decoration-primary decoration-2 underline-offset-4"
        >
          {children}
        </Component>
      );
    },
    ol: (props) => <ul className="mt-4 list-decimal pl-8" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc pl-8" {...props} />,
    hr: (props) => <hr className="my-4" {...props} />,
    code: (props) => (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-muted-foreground"
        {...props}
      />
    ),
    // eslint-disable-next-line @next/next/no-img-element
    img: (props) => <img {...props} className="rounded-lg" alt={props.alt} />,

    // Pass through all other components.
    ...components,
  };
}
