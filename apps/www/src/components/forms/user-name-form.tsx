"use client";

import type { FormData } from "@/actions/update-user-name";
import type { User } from "@prisma/client";
import { useTransition } from "react";
import { updateUserName } from "@/actions/update-user-name";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { userNameSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { buttonVariants } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import { Input } from "@dingify/ui/components/input";
import { Label } from "@dingify/ui/components/label";
import { toast } from "sonner";

interface UserNameFormProps {
  user: Pick<User, "id" | "name">;
}

export function UserNameForm({ user }: UserNameFormProps) {
  const [isPending, startTransition] = useTransition();
  const updateUserNameWithId = updateUserName.bind(null, user.id);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const { status } = await updateUserNameWithId(data);

      if (status !== "success") {
        toast.error("Your name was not updated. Please try again.");
      } else {
        toast.success("Your name has been updated.");
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{isPending ? "Saving" : "Save"}</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
