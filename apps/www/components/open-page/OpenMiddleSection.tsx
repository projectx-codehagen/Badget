import { Separator } from "../ui/separator";

export default function OpenMiddleSection() {
  return (
    <section className="container flex flex-col items-center text-center">
      <div className="mx-auto mb-10 flex w-full flex-col gap-5">
        {/* <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Open startup
        </p> */}
        <h2 className="font-heading text-3xl leading-[1.1] md:text-5xl">
          Funding
        </h2>
        <p className="text-large font-medium text-muted-foreground">
          We dont have done any funding runs yet, should we?
        </p>
      </div>
      <Separator />
    </section>
  );
}
