"use client";

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "./button";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
}

export function ImageUpload({
    value,
    onChange
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
                {value ? (
                    <div className="relative w-40 h-40">
                        <Image
                            src={value}
                            alt="Upload"
                            fill
                            className="object-cover rounded-lg"
                        />
                        <Button
                            onClick={() => onChange("")}
                            className="absolute -top-2 -right-2 p-1 rounded-full"
                            variant="destructive"
                            size="sm"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <UploadButton<OurFileRouter, "imageUploader">
                        endpoint="imageUploader"
                        onUploadBegin={() => setIsUploading(true)}
                        onClientUploadComplete={(res) => {
                            setIsUploading(false);
                            onChange(res?.[0].url || "");
                        }}
                        onUploadError={(err) => {
                            setIsUploading(false);
                            console.error(err);
                        }}
                    />
                )}
            </div>
            {isUploading && (
                <div className="text-center text-sm text-gray-500">
                    Uploading...
                </div>
            )}
        </div>
    );
}
