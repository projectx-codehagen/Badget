"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@dingify/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dingify/ui/components/dialog";
import { Input } from "@dingify/ui/components/input";
import { Label } from "@dingify/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dingify/ui/components/select";

export function AddPropertyButton() {
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/property/addproperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, type: propertyType }), // Include propertyType in the request
      });

      if (!response.ok) {
        throw new Error("Failed to add property");
      }

      const newProperty = await response.json();
      // toast.success('Property added successfully!');
      router.push(`/property/${newProperty.id}`); // Update with the correct path to view the property
    } catch (error) {
      // toast.error('Error adding property. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" disabled={isLoading}>
          Placeholder Button
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add new property</DialogTitle>
            <DialogDescription>
              Write in the street address and let us make your job easier.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="col-span-1 text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Address..."
                className="col-span-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="propertyType" className="col-span-1 text-right">
                Type
              </Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="APARTMENT">Apartment</SelectItem>
                  <SelectItem value="HOUSE">House</SelectItem>
                  <SelectItem value="CABIN">Cabin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Saving..." : "Save new property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
