"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";

// @ts-ignore
export function SelectInputForm({ options, image }) {
  const router = useRouter();
  const [activeSwitch, setActiveSwitch] = useState(null);

  // @ts-ignore
  const dynamicSchema = options.reduce((acc, option) => {
    acc[option.key] = z.boolean();
    return acc;
  }, {});

  const form = useForm({
    resolver: zodResolver(z.object(dynamicSchema)),
  });

  // @ts-ignore
  const handleSwitchChange = async (option) => {
    setActiveSwitch(option.label);

    // Get the content of the selected option
    const selectedOptionContent = option.description;

    // Call the server action to update the selected option in the database
  };

  // @ts-ignore
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5 grid gap-2">
        {image.selectedOption ? (
          <div className="flex items-center">
            <Card>
              <CardHeader className="relative">
                <span
                  onClick={() =>
                    handleSwitchChange({ imageId: image.id, description: null })
                  }
                  className="absolute right-3 top-3 hover:cursor-pointer"
                >
                  <X size="16" />
                </span>
                <CardDescription>Selected Option:</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {
                  (image.selectedOption = image.selectedOption.replace(
                    /^\d+\.\s*/,
                    "",
                  ))
                }
              </CardContent>
            </Card>
          </div>
        ) : null}
        {/* @ts-ignore */}
        {options.every((option) => !option.selectedOption) && (
          <>
            {/* @ts-ignore */}
            {options.map((option) => (
              <FormField
                key={option.key}
                control={form.control}
                name={option.label}
                render={({ field }) => (
                  <div
                    onClick={() => {
                      handleSwitchChange(option);
                    }}
                    className="flex w-full cursor-pointer flex-row items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        {option.label}
                      </FormLabel>
                      <FormDescription>{option.description}</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        className="mx-2"
                        id={`${option.key}-switch`}
                        type="submit"
                        checked={activeSwitch === option.label}
                        onClick={() => {
                          handleSwitchChange(option);
                        }}
                        {...field}
                      />
                    </FormControl>
                  </div>
                )}
              />
            ))}
          </>
        )}
      </form>
    </Form>
  );
}
