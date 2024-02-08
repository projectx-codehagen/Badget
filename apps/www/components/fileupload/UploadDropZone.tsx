"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useEdgeStore } from "@/lib/edgestore";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/fileupload/MultiFileDropzone";

import { Icons } from "../shared/icons";
import { useToast } from "../ui/use-toast";

// Image Compression Function
async function compressImage(
  // @ts-ignore
  file,
  maxWidth = 1024,
  maxHeight = 1024,
  quality = 0.7,
) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Adjust the size while maintaining the aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = height * (maxWidth / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = width * (maxHeight / height);
          height = maxHeight;
        }
      }

      // Draw the image onto the canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(
              new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              }),
            );
          } else {
            reject(new Error("Canvas toBlob returned null"));
          }
        },
        "image/jpeg",
        quality,
      );
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
}

// @ts-ignore
export function UploadDropZone({ propertyId, slug }) {
  const { toast } = useToast();
  const path = usePathname();
  const router = useRouter();
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();

  // @ts-ignore
  async function updateFileProgress(key, progress) {
    setFileStates((currentFileStates) => {
      return currentFileStates.map((fileState) => {
        if (fileState.key === key) {
          return { ...fileState, progress };
        }
        return fileState;
      });
    });
  }

  // @ts-ignore
  async function onFilesAdded(addedFiles) {
    setFileStates([...fileStates, ...addedFiles]);
    setLoading(true);

    // @ts-ignore
    const compressAndUpload = async (fileState) => {
      try {
        // Compress the image
        const compressedFile = await compressImage(fileState.file);
        // Proceed with the upload
        const res = await edgestore.publicFiles.upload({
          file: compressedFile as File,
          onProgressChange: async (progress) => {
            updateFileProgress(fileState.key, progress);
          },
        });
        return { ...res, status: "COMPLETE" };
      } catch (err) {
        updateFileProgress(fileState.key, "ERROR");
        return { ...fileState, status: "ERROR" };
      }
    };

    const uploadPromises = addedFiles.map(compressAndUpload);
    const uploadedFiles = await Promise.all(uploadPromises);
    const successfulUploads = uploadedFiles.filter(
      (file) => file.status === "COMPLETE",
    );
    const imageUrls = successfulUploads.map((file) => file.url);
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      {loading && (
        <div className="grid max-w-sm justify-center justify-items-center gap-y-4 pb-4 text-center">
          <Icons.spinner className="h-8 w-8 animate-spin text-blue-600" />
          <p>Please wait...</p>
          <p>You will be redirected once the description generation is done.</p>
        </div>
      )}
      <MultiFileDropzone
        className={`${loading && "hidden"} m-auto`}
        value={fileStates}
        onChange={setFileStates}
        onFilesAdded={onFilesAdded}
      />
    </div>
  );
}
