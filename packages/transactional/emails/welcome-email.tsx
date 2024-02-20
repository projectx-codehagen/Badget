import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import Footer from "./_components/footer";

export default function WelcomeEmail({
  name = "John Doe",
  email = "welcome@Badget.io",
}: {
  name: string | null;
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Badget </Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8"></Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Welcome to Badget
            </Heading>

            <Text className="text-sm leading-6 text-black">
              Thank you for joining us{name && `, ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              I'm Christer, the creator of Badget - Excited to have you on
              board!
            </Text>
            <Text className="text-sm leading-6 text-black">
              Here's what you can start doing:
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Generate your first{" "}
              <Link
                href="https://Badget-eight-gilt.vercel.app/dashboard"
                className="font-medium text-blue-600 no-underline"
              >
                AI-powered property listing
              </Link>
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Manage your{" "}
              <Link
                href="https://Badget-eight-gilt.vercel.app/dashboard"
                className="font-medium text-blue-600 no-underline"
              >
                property portfolio
              </Link>
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Connect with us on{" "}
              <Link
                href="https://discord.gg/wadg6fNX"
                className="font-medium text-blue-600 no-underline"
              >
                Twitter
              </Link>
            </Text>
            <Text className="text-sm leading-6 text-black">
              If you have any questions or feedback, feel free to reach out.
              We're here to help!
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              Christer from Badget
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
