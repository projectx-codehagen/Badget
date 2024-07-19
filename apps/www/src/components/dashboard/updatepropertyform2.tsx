"use client";

import React, { useState } from "react";
import { updatePropertyDetails } from "@/actions/update-property-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 as Spinner } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@dingify/ui/components//input";
import { Label } from "@dingify/ui/components//label";
import { Textarea } from "@dingify/ui/components//textarea";
import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import { toast } from "sonner";

// Define your schema as per your requirements
const propertyFormSchema = z.object({
  address: z.string(),
  description: z.string().optional(),
  pris: z.string(),
  p_rom: z.string(),
  bra: z.string(),
  // ... add other fields as necessary
});

export function UpdatePropertyForm2({ defaultValues, propertyId }) {
  const [isLoading, setIsLoading] = useState(false); // Add this line
  const form = useForm({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading
    try {
      const response = await updatePropertyDetails(propertyId, data);
      if (response.success) {
        toast.success("Property details updated successfully.");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error("Failed to update property details.");
    }
    setIsLoading(false); // Stop loading
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Property Details</CardTitle>
        <CardDescription>Update the appraisal report</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {/* Single field for pris */}
          <div className="grid gap-2">
            <Label htmlFor="pris">Asking Price</Label>
            <Input id="pris" {...form.register("pris")} />
          </div>

          {/* Two-column grid layout for p_rom and bra */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="p_rom">P-rom</Label>
              <Input id="p_rom" {...form.register("p_rom")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bra">Bra</Label>
              <Input id="bra" {...form.register("bra")} />
            </div>
          </div>

          {/* Remaining fields */}
          {/* {["address", "description"].map((key) => (
            <div key={key} className="grid gap-2">
              <Label htmlFor={key}>{key}</Label>
              <Input id={key} {...form.register(key)} />
            </div>
          ))} */}

          {/* Textarea for description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...form.register("description")} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 animate-spin" /> Updating...
            </>
          ) : (
            "Update Property"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
