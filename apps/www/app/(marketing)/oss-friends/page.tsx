import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Badget | Open Source Friends",
  description: "Open-source projects and tools for an open world.",
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
    },
  )
    .then(async (res) => res.json())
    .then(({ data }) => data)
    .catch(() => []);

  return (
    <div className="mx-auto mt-14 max-w-6xl p-4 md:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Our Open Source Friends
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Meet our friends who are also building and contributing to Open
          Source.
        </p>
      </div>
      <ul
        role="list"
        className=" mt-12 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
      >
        {friends.map((friend) => (
          <li
            key={friend.name}
            className="flex flex-col justify-between space-y-2 overflow-hidden rounded-xl border border-gray-700 bg-secondary/70 p-4 md:p-6"
          >
            <div>
              <div className="px-6 text-xl font-medium leading-6">
                <a
                  href={friend.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  {friend.name}
                </a>
              </div>
              <p className="mt-2 px-6 text-sm text-muted-foreground ">
                {friend.description}
              </p>
            </div>
            <div className="px-6 text-left">
              <a
                href={friend.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button type="button">Learn more</Button>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
