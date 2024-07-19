"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProjectAndChannel } from "@/actions/create-project-and-channel";

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
import { toast } from "sonner";

export function AddProjectButton() {
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await createProjectAndChannel(projectName);

      if (!result.success) {
        throw new Error(result.error || "Failed to add project");
      }

      toast.success(`Project "${projectName}" created successfully.`);

      // router.push(`/project/${result.project?.id}`);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" disabled={isLoading}>
          Add New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add new project</DialogTitle>
            <DialogDescription>
              Enter the name of the new project and a channel will be created
              automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="col-span-1 text-right">
                Project Name
              </Label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="Project Name..."
                className="col-span-3"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Saving..." : "Save new project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
