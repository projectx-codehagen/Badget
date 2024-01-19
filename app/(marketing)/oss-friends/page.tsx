import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Projectx | Open Source Friends",
  description:
    "Open-source projects and tools for an open world.",
};

type OSSFriend = {
  href: string;
  name: string;
  description: string;
};


export default async function Friends() {
  const friends: OSSFriend[] = await fetch(
    "https://formbricks.com/api/oss-friends",
    {
      next: {
        revalidate: 3600,
      },
    }
  )
    .then(async (res) => res.json())
    .then(({ data }) => data)
    .catch(() => []);

  return (
    <div className="mt-14 max-w-6xl mx-auto p-4 md:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Our Open Source Friends
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-8">
          Meet our friends who are also building and contributing to Open Source.
        </p>
      </div>
      <ul
        role="list"
        className=" mt-12 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {friends.map((friend) => (
          <li
            key={friend.name}
            className="overflow-hidden rounded-xl bg-secondary/70 border border-gray-700 p-4 md:p-6 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-xl font-medium leading-6 px-6">
                <a
                  href={friend.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block">
                  {friend.name}
                </a>
              </div>
              <p className="px-6 mt-2 text-muted-foreground text-sm ">
                {friend.description}
              </p>
            </div>
            <div className="text-left px-6">
              <a
                href={friend.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block">
                <Button
                  type="button"
                >
                  Learn more
                </Button>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}