"use client";

import React, { useState } from "react";
import { updateUserLanguage } from "@/actions/update-language";
import { Icons } from "@/components/shared/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dingify/ui/components/select";
import { toast } from "sonner";

const languageSchema = z.object({
  language: z.string({
    required_error: "Language is required",
  }),
});

export function LanguageForm2({ user }) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    user.language || "english"
  );
  const [isPending, setPending] = useState(false);
  const form = useForm({
    resolver: zodResolver(languageSchema),
    // Remove defaultValues here, we will use useState to manage the select's value
  });

  const { handleSubmit, setValue } = form;

  const onSubmit = async (data) => {
    setPending(true);
    console.log("Submitted data:", data); // Check what is being submitted
    try {
      const response = await updateUserLanguage(data.language);
      console.log("Update response:", response); // Check the response from the update call
      if (response.success) {
        toast.success("Language updated successfully.");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Update error:", error); // Log any caught errors
      toast.error(error.message || "Failed to update language.");
    } finally {
      setPending(false);
    }
  };

  // Use this function to handle the language change
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setValue("language", language); // Update form value manually
    console.log("Language changed to:", language); // Log the change for debugging
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Select Language</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="norwegian">Norwegian</SelectItem>
              <SelectItem value="swedish">Swedish</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            variant="default"
            className={buttonVariants({ variant: "default" })}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Language"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
