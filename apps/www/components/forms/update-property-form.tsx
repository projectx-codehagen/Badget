// components/forms/update-property-form.js
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const propertyFormSchema = z.object({
  address: z.string(),
  description: z.string().optional(),
  p_rom: z.string().optional(),
  bra: z.string().optional(),
  soverom: z.string().optional(),
  pris: z.string().optional(),
  takst_text: z.string().optional(),
});

// @ts-ignore
export function UpdatePropertyForm({ propertyId, defaultValues }) {
  const form = useForm({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: defaultValues,
  });

  // @ts-ignore
  const onSubmit = async (data) => {
    // Here you would handle the form submission,
    // likely sending the data to your backend to update the property
    console.log("Form data submitted:", data);

    // Example of a server action or API call
    // await updateProperty(propertyId, data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {Object.keys(propertyFormSchema.shape).map((key) => (
          <FormItem key={key}>
            <FormLabel>{key}</FormLabel>
            <FormControl>
              <Input type="text" placeholder={key} {...form.register(key)} />
            </FormControl>
          </FormItem>
        ))}
        <Button type="submit">Update Property</Button>
      </form>
    </Form>
  );
}
